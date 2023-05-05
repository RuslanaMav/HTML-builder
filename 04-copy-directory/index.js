const path = require('path');
const fs = require('node:fs/promises');

(async () => {
const createDir = await fs.mkdir(path.join(__dirname, "files-copy"), { recursive: true });
const files = await fs.readdir(path.join(__dirname, 'files'));
const filesCopy = await fs.readdir(path.join(__dirname, 'files-copy'));
for (const file of filesCopy) 
fs.unlink(path.join(__dirname, "files-copy", file));
for (const file of files) 
fs.copyFile(path.join(__dirname, "files", file), path.join(__dirname, "files-copy", file));

})();

