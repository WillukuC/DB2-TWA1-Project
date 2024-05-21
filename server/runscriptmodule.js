const subprocess = require('child_process')

function runPythonScript(script, args) {
    return new Promise((resolve, reject) => {
        
        const result = subprocess.spawn(`python3 "${script}"`, [...args], { shell: true });
        let output = '';
        
        result.stdout.on('data', (data) => {
            output += data.toString();
        });
 
        result.stderr.on('data', (data) => {
            console.error(`Error: ${data}`);
        });
        
        result.on('close', (code) => {
            if (code === 0) {
                if (output.trim()) {
                    resolve(output.trim());
                } else {
                    reject('No output received from the Python script.');
                }
            } else {
                reject(`Python process exited with code ${code}`);
            }
        });
    });
}

module.exports = {
    runPythonScript,
}