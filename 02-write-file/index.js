const fs = require('fs');
const path = require('path');
const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));
const { stdin, stdout } = process;
stdout.write('Enter text:\n');

stdin.on('data', (data) => {
    if (data.toString().trim() === 'exit') {
        stdout.write('Goodbye!');
        process.exit();
    }
    else{
      output.write(data.toString());
    }
  });

process.on('SIGINT', () => {
    stdout.write('Goodbye!');
    process.exit();
});

