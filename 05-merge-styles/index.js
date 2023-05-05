const path = require('path');
const fs = require('node:fs/promises');
const fs1= require('fs');
const output = fs1.createWriteStream(path.join(__dirname, 'project-dist/bundle.css'));

(async () => {
const files = await fs.readdir(path.join(__dirname, 'styles'));
for (const file of files) {
    const ext = path.extname(file);
    if (ext === ".css") {
     const stream = new fs1.ReadStream(path.join(__dirname, 'styles', file), 'utf-8');
     stream.on('readable', function(){
        let data = stream.read();
        if(data !== null) output.write(data.toString())
    });
    }
 } 

})();
