const concurrently = require("concurrently");

concurrently(
  [
    { command: "yarn start:backend", prefixColor: "blue", name: "bot" },
    {
      command: `yarn start:frontend`,
      prefixColor: "magenta",
      name: "website"
    }
  ],
  {
    killOthers: ["failure", "success"]
  }
);
