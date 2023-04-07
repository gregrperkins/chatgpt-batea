const fs = require("fs");
const path = require("path");
const { program } = require("commander");
const mustache = require("mustache");

program.option("-r, --readme", "generate README file with bookmarklet link");

program.parse(process.argv);
const options = program.opts();

const rootDir = path.join(__dirname, "..");
const srcDirPath = path.join(rootDir, "src");
const srcFilePath = path.join(srcDirPath, "bookmarklet.js");
const distDirPath = path.join(rootDir, "dist");
const distFilePath = path.join(distDirPath, "bookmarklet.min.js");

fs.promises
  .mkdir(distDirPath, { recursive: true })
  .then(() => fs.promises.readFile(srcFilePath, "utf-8"))
  .then((srcData) => {
    const bookmarklet = `javascript:${encodeURIComponent(srcData)
      .replace(/\(/g, "%28")
      .replace(/\)/g, "%29")}`;

    if (options.readme) {
      const readmeSrcFilePath = path.join(srcDirPath, "README-template.md");
      const readmeDistFilePath = path.join(rootDir, "README.md");

      const readmeData = {
        BookmarkletLink: bookmarklet,
      };

      return fs.promises
        .readFile(readmeSrcFilePath, "utf-8")
        .then((template) => mustache.render(template, readmeData))
        .then((readme) =>
          fs.promises.writeFile(readmeDistFilePath, readme, "utf-8")
        )
        .then(() =>
          console.log(`Generated README.md at ${readmeDistFilePath}`)
        );
    } else {
      return fs.promises
        .writeFile(distFilePath, bookmarklet, "utf-8")
        .then(() => console.log(`Generated bookmarklet at ${distFilePath}`));
    }
  })
  .catch((err) => {
    console.error(err);
  });
