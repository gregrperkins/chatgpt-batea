const fs = require("fs");
const path = require("path");
const { program } = require("commander");
const mustache = require("mustache");
const marked = require("marked");

program.option("-b, --bookmarklet", "generate a proper JS file in /dist");
program.option("-r, --readme", "overwrite README.md file with new bookmarklet");
program.option("-p, --page", "overwrite index.html file with new bookmarklet");
program.option("-a, --all", "generate everything");
program.parse(process.argv);
const options = program.opts();

const paths = {
  rootDir: path.join(__dirname, ".."),
};
paths.srcDir = path.join(paths.rootDir, "src");
paths.srcFile = path.join(paths.srcDir, "bookmarklet.js");
paths.distDir = path.join(paths.rootDir, "dist");
paths.distFile = path.join(paths.distDir, "bookmarklet.min.js");
paths.readmeSrcFile = path.join(paths.srcDir, "README-template.md");
paths.readmeDistFile = path.join(paths.srcDir, "README.md");
paths.indexDistFile = path.join(paths.rootDir, "index.html");

const maybeWriteReadme = (bookmarkletCode) => {
  if (options.all || options.readme) {
    const readmeData = {
      BookmarkletLink: bookmarkletCode,
    };

    return fs.promises
      .readFile(paths.readmeSrcFile, "utf-8")
      .then((template) => mustache.render(template, readmeData))
      .then((readme) =>
        fs.promises.writeFile(paths.readmeDistFile, readme, "utf-8")
      )
      .then(() => console.log(`Generated README.md at ${paths.readmeDistFile}`))
      .then(() => bookmarkletCode);
  }
  return bookmarkletCode;
};

const maybeWriteIndex = (bookmarkletCode) => {
  if (options.all || options.index) {
    const indexData = {
      BookmarkletLink: bookmarkletCode,
    };

    fs.promises
      .readFile(paths.readmeSrcFile, "utf-8")
      .then((template) => mustache.render(template, indexData))
      .then((markdown) => marked.marked(markdown))
      .then((html) => fs.promises.writeFile(paths.indexDistFile, html, "utf-8"))
      .then(() => console.log(`Generated index.html at ${paths.indexDistFile}`))
      .then(() => bookmarkletCode);
  }
  return bookmarkletCode;
};

const maybeWriteBookmarklet = (bookmarkletCode) => {
  if (options.all || (!options.index && !options.readme)) {
    fs.promises
      .writeFile(paths.distFile, bookmarkletCode, "utf-8")
      .then(() => console.log(`Generated bookmarklet at ${paths.distFile}`));
  }
};

fs.promises
  .mkdir(paths.distDir, { recursive: true })
  .then(() => fs.promises.readFile(paths.srcFile, "utf-8"))
  .then((srcData) => {
    return `javascript:${encodeURIComponent(srcData)
      .replace(/\(/g, "%28")
      .replace(/\)/g, "%29")}`;
  })
  .then(maybeWriteReadme)
  .then(maybeWriteIndex)
  .then(maybeWriteBookmarklet)
  .catch((err) => {
    console.error(err);
  });
