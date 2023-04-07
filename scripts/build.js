const fs = require("fs");
const path = require("path");

const srcFilePath = path.join(__dirname, "..", "src", "bookmarklet.js");
const distDirPath = path.join(__dirname, "..", "dist");
const distFilePath = path.join(distDirPath, "bookmarklet.min.js");

fs.promises
  .mkdir(distDirPath, { recursive: true })
  .then(() => fs.promises.readFile(srcFilePath, "utf-8"))
  .then((data) => {
    const bookmarklet = `javascript:${encodeURIComponent(data)}`;

    return fs.promises.writeFile(distFilePath, bookmarklet, "utf-8");
  })
  .then(() => {
    console.log(`Generated bookmarklet at ${distFilePath}`);
  })
  .catch((err) => {
    console.error(err);
  });
