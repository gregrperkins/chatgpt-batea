const fs = require('fs');
const path = require('path');

const srcFilePath = path.join(__dirname, 'src', 'bookmarklet.js');
const distFilePath = path.join(__dirname, 'dist', 'bookmarklet.min.js');

fs.promises.readFile(srcFilePath, 'utf-8')
  .then((data) => {
    const bookmarklet = `javascript:${encodeURIComponent(data)}`;

    return fs.promises.writeFile(distFilePath, bookmarklet, 'utf-8');
  })
  .then(() => {
    console.log(`Generated bookmarklet at ${distFilePath}`);
  })
  .catch((err) => {
    console.error(err);
  });