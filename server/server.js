const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const runScriptModule = require('./runscriptmodule.js');
const fs = require('fs');
const path = require('path')
const argsModule = require('./argumentModule.js');

// Middleware
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

// Routes
app.get('/hello', function(req, res) {
    res.send('Hello World')
});

app.get('/countries', async function(req, res) {
    res.send(["Australia", "Canada", "Denmark"])
})

app.get('/graph', async function(req, res) {
    // Variables and constants
    const graphType = req.query.type
    const body = req.body
    let scriptPath

    // Switch case for graph type
    switch (graphType) {
        case 'fossil':
            scriptPath = path.join(__dirname, 'database', 'Line_Graph.py')
            break;
        case 'sustainable':
            scriptPath = path.join(__dirname, 'database', 'Pie_Chart.py')
            break;
        case 'top':
            scriptPath = path.join(__dirname, 'database', 'Bar_Graph.py')
            break;
        case 'nuclear':
            scriptPath = path.join(__dirname, 'database', 'Nuclear_Graph.py')
            break;
        case 'test':
            scriptPath = path.join(__dirname, 'testing', 'testscript.py')
            break;
        default:
            // Handle error
            console.error('Invalid query parameter');
            res.status(400)
            res.send({message: 'Invalid query parameter'})
    }
    try {
        // Get arguments for script
        const args = await argsModule.getArguments(graphType, body)
        console.log('args: ', args);
        
        // Running the script to generate graph image
        const imageName = await runScriptModule.runPythonScript(scriptPath, args)

        // Getting the path to the generated image
        const imagePath = path.join(__dirname, 'images', imageName).trim()

        // Check if the image file exists
        if (!fs.existsSync(imagePath)) {
            res.status(404).send('Image not found')
            return;
        };
        
        // Set content-type header to PNG
        res.set('Content-Type', 'image/png')
        res.status(200)

        // Send the image file
        stream = fs.createReadStream(imagePath)
        stream.pipe(res)

        // If the file has been recieved by the client
        stream.on('end', () => {
            // Delete image file if successful
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Failed to delete image:', err)
                } else {
                    console.log('Image successfully deleted')
                }
            })
        })

        // Check for errors occuring when deleting
        stream.on('error', (err) => {
            console.error('Stream error: ', err);
            res.status(500)
            res.send({message: 'Internal Server Error'});
        })
    } catch (err) {
        console.error('Server error: ', err)
        res.status(500)
        res.send({message: 'Internal Server Error'});
    }
});

// Running server
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("Server listening on port " + port)
});