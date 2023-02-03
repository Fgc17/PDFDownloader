const fs = require('fs');
const file = JSON.parse(fs.readFileSync('./dump.har')).log;
const targetMimeType = 'image/jpeg';

let count = 0;
for (const entry of file.entries) {
  if (entry.response.content.mimeType === targetMimeType) {
    // ensure output directory exists before running!
    fs.writeFileSync(`output/${count}.png`, entry.response.content.text, 'base64', function(err) {
      console.log(err);
    });
    count++;
  }
}

console.log(`Grabbed ${count} files`)