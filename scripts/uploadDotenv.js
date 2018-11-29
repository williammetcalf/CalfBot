const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const file = path.join(__dirname, "../.env");

let appName =
  process.argv.find(arg => arg.startsWith("--app=")) || "--app=calfbot-stage";
appName = appName.replace("--app=", "");

getDeployUrl().then(deployUrl => {
  console.log("Reading file: ", file);

  fs.readFile(file, "utf8", async (err, data) => {
    if (err) throw err;

    const lines = data.split("\r\n");
    let varLines = lines.filter(
      line => !!line && line.split("=").length >= 2 && !line.startsWith("#")
    );

    console.log(`Picked up ${varLines.length} variables`);

    if (deployUrl) {
      console.log(`Found deploy url: ${deployUrl}`);
      varLines = varLines.map(l => l.replace("localhost:3000/", deployUrl));
    }

    varLines.forEach(line => {
      const firstEqual = line.indexOf("=");
      const name = line.substring(0, firstEqual);
      const value = line.substring(firstEqual + 1);
      setVariable(name, value);
    });
  });
});

function setVariable(name, value) {
  const cmd = `heroku config:set ${name}="${value}" --app=${appName}`;
  console.log(cmd);
  exec(cmd);
}

function getDeployUrl() {
  return new Promise((resolve, reject) => {
    const cmd = `heroku info --app=${appName}`;
    console.log(cmd);
    exec(cmd, (err, val) => {
      if (err || !val) return reject(err || `Could not find app: ${appName}`);

      const lines = val.split("\n");
      const urlLine = lines.find(l => l.startsWith("Web URL:"));
      const url = urlLine.replace("Web URL:", "").trim();
      resolve(url);
    });
  });
}
