import express from "express";

const apiRouter = express.Router();

apiRouter.get("/test", (req, res) => res.send("OK"));

export default apiRouter;
