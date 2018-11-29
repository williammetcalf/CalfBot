const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const file = path.join(__dirname, "../.env");
console.log("Reading file: ", file);

fs.readFile(file, "utf8", (err, data) => {
  if (err) throw err;

  const lines = data.split("\n");
  const varLines = lines.filter(line => line.split("=").length === 2);

  console.log(`Picked up ${varLines.length} variables`);

  varLines.forEach(line => {
    const split = line.split("=");
    setVariable(split[0], split[1]);
  });
});

setVariable = (name, value) => {
  const cmd = `heroku config:set ${name}=${value} --app=calfbot-stage`;
  console.log(cmd);
  exec(cmd);
};
