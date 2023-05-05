const path = require('path');
const fs = require('node:fs/promises');
(async () => {
    const files = await fs.readdir(path.join(__dirname, 'secret-folder'));
    for (const file of files) {
       fs.stat(path.join(__dirname, 'secret-folder', file))
       .then(res => {
        if (!res.isDirectory()) 
        console.log(` ${file.replace(path.extname(file), "")} - ${path.extname(file).replace(".", "")} - ${res.size}b`)
       });
    }
  })();


  
