const path = require('path');
const fs = require('node:fs/promises');
const fs1= require('fs');

(async () => {
const createDir = await fs.mkdir(path.join(__dirname, "project-dist"), { recursive: true });

// добавление стилей 
const output = fs1.createWriteStream(path.join(__dirname, 'project-dist/style.css'));
const files = await fs.readdir(path.join(__dirname, 'styles'));
for (const file of files) {
    const ext = path.extname(file);
    if (ext === ".css") {
     const stream = new fs1.ReadStream(path.join(__dirname, 'styles', file), 'utf-8');
     stream.on('readable', function(){
        let data = stream.read();
        if(data !== null) output.write(data.toString());
    });
    }
}
// добавление assets
    await fs.mkdir(path.join(__dirname, "project-dist/assets"), { recursive: true });
    const filesAssets = await fs.readdir(path.join(__dirname, 'assets'));
    for (const file of filesAssets) {
      await fs.mkdir(path.join(__dirname, "project-dist/assets", file), { recursive: true });
      const fileDir = await fs.readdir(path.join(__dirname, 'assets', file));
      const filesAssetsCopy = await fs.readdir(path.join(__dirname, 'project-dist/assets', file));
      for (const f1 of filesAssetsCopy) fs.unlink(path.join(__dirname, "project-dist/assets", file, f1));
      for (const f of fileDir)
      fs.copyFile(path.join(__dirname, "assets", file, f), path.join(__dirname, "project-dist/assets", file, f));
    }


//добавление HTML
const html = fs1.createWriteStream(path.join(__dirname, 'project-dist/index.html'));
const template = fs1.ReadStream(path.join(__dirname, 'template.html'), 'utf-8');
let obj  = {};
const compRead = await fs.readdir(path.join(__dirname, 'components'));
for (const file of compRead) {
    const compRead = fs1.ReadStream(path.join(__dirname, 'components', file), 'utf-8');
    compRead.on('readable', function(){
        let data = compRead.read();
        if (data !== null){
            const txt = data.toString();
            obj["{{"+file.replace(path.extname(file), "")+"}}"] = txt;          
            template.on('readable', function(){
                let data1 = template.read();
                if (data1 !== null) {
                  let h = data1.toString();
                  for (const key in obj)
                    h = h.replace(key, obj[key]);  
                html.write(h);
               }  
            })
        }
    })  
}
})();