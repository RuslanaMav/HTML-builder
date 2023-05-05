const fs = require('fs');
const path = require('path');
const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));
const { stdin, stdout } = process;
stdout.write('Enter text:\n');
stdin.on('data', data => {
    if (data.toString() !== "exit\r\n") output.write(data);
    else {
        stdout.write("Goodbye!")
        process.exit();
    }
});

process.on('SIGINT', () => {
    stdout.write('Goodbye!');
    process.exit();
});