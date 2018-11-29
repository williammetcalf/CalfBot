import http from "http";

import app from "./server";

const env = { ...process.env }; // heroku loses .PORT if not cloned
const port = +env.PORT || 3000;

const server = http.createServer(app);

let currentApp = app;

server.listen(port, error => {
  if (error) {
    console.log(error);
  }

  console.log(`🚀 started on port ${port}`);
});

if (module.hot) {
  console.log("✅  Server-side HMR Enabled!");

  module.hot.accept("./server", () => {
    console.log("🔁  HMR Reloading `./server`...");
    server.removeListener("request", currentApp);
    const newApp = require("./server").default;
    server.on("request", newApp);
    currentApp = newApp;
  });
}
