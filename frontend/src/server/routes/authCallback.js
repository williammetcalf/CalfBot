import express from "express";

const authCallbackRouter = express.Router();

authCallbackRouter.get("/*", (req, res) => res.send("OK"));

export default authCallbackRouter;
