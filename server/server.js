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

// Functions
function deleteFilesInDirectory(directoryPath) {
    fs.readdirSync(directoryPath).forEach(file => {
        const filePath = path.join(directoryPath, file);
        if (fs.lstatSync(filePath).isFile()) {
            fs.unlinkSync(filePath);
            console.log(`Deleted ${filePath}`);
        }
    });
}

// Routes
app.get('/hello', function(req, res) {
    res.send('Hello World')
});

app.get('/countries', async function(req, res) {
    try {
        // Initializing args as empty
        const args = []
        // Setting scriptPath
        const scriptPath = path.join(__dirname, 'database', 'countries_list.py')
        // Getting the list of countries
        const countries_list = await runScriptModule.runPythonScript(scriptPath, args)
        const parsedCountries = JSON.parse(countries_list);
        // If successful
        res.status(200)
        res.send(parsedCountries)
    } catch (err) {
        // Handle errors
        console.error('Internal Server Error');
        res.status(500)
        res.send({message: 'Internal Server Error'})
    }
})

app.post('/graph', async function(req, res) {
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
        
        // Deleting contents of images
        const imagesFolderPath = path.join(__dirname, 'images')
        deleteFilesInDirectory(imagesFolderPath)

        // Running the script to generate graph image
        const imageName = await runScriptModule.runPythonScript(scriptPath, args)
        console.log('imageName: ', imageName);

        // Getting the path to the generated image
        const imagePath = path.join(imagesFolderPath, imageName).trim()
        console.log('imagePath: ', imagePath);

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