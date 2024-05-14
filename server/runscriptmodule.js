const subprocess = require('child_process')

function runPythonScript(script, args) {
    return new Promise((resolve, reject) => {
        
        const result = subprocess.spawn(`python "${script}"`, [...args], { shell: true });
        let output = '';
        
        result.stdout.on('data', (data) => {
            output += data.toString();
        });
 
        result.stderr.on('data', (data) => {
            console.error(`Error: ${data}`);
        });
        
        result.on('close', (code) => {
            if (code === 0) {
                console.log(output)
                resolve(output);
            } else {
                reject(`Python process exited with code ${code}`);
            }
        });
    });
}

module.exports = {
    runPythonScript,
}