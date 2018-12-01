import express from 'express';
import twitchAuth from './oauth/twitch';

const authCallbackRouter = express.Router();

authCallbackRouter.get('/twitch', twitchAuth);

export default authCallbackRouter;
