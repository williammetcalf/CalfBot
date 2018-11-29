import express from "express";

import apiRouter from "./routes";
import renderIndexHtml from "./renderIndexHtml";

const server = express();

server.disable("x-powered-by");
server.use(express.static(process.env.RAZZLE_PUBLIC_DIR));

server.use("/api", apiRouter);

server.get("/*", (req, res) => {
  res.status(200).send(renderIndexHtml(req.url));
});

export default server;
