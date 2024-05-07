const express = require('express')
const app = express()
const cors = require('cors');
const morgan = require('morgan');
const runScriptModule = require('./runscriptmodule.js')
const fs = require('fs')
// Middleware
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

// Routes
app.get('/hello', function(req, res) {
    res.send('Hello World')
})

app.get('/testscript', async function(req, res) {
    const scriptPath = './testing/testscript.py'
    try {
        const args = [1, 2, 3]
        const result = await runScriptModule.runPythonScript(scriptPath, args)
        // Assuming the result is the path to the PNG image
        const imagePath = './simple_plot.png';
        // Check if the image file exists
        if (!fs.existsSync(imagePath)) {
            res.status(404).send('Image not found');
            return;
        }
        
        // Set content-type header to PNG
        res.set('Content-Type', 'image/png');
        res.status(200)
        // Send the image file
        fs.createReadStream(imagePath).pipe(res);
        
    } catch (err) {
        console.log(err)
    }
}) 

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("Server listening on port " + port)
})