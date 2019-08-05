import fs from "fs";

/**
 * backup
 *
 * @param {*} name
 * @param {*} content
 */
const backup = (name, content) => {
  let folderName = new Date()
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric"
    })
    .replace(/ /g, "-");
  let dir = `backups/${folderName}`;
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  fs.writeFile(`${dir}/${name}.json`, JSON.stringify(content), err => {
    if (err) throw err;
    // success case, the file was saved
    console.log(`Saved-> ${name}.json`);
  });
};

export { backup };
