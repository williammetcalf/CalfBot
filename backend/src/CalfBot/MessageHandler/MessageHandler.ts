import { CalfBot } from '../index';
import { Logger } from '../../Logger';
import { SpotifyMessageHandler } from './index';
import AbstractMessageHandler from './AbstractMessageHandler/AbstractMessageHandler';
import { TwitchMessage } from '../../models';
import ImageModerationHandler from './ImageModerationHandler/ImageModerationHandler';

const logger = Logger.getInstance('Chat');

export default class MessageHandler extends AbstractMessageHandler {
  constructor(bot: CalfBot, channel: any) {
    super();
    this.addMessageHandler(new SpotifyMessageHandler(bot, channel));
    this.addMessageHandler(new ImageModerationHandler(bot, channel));
  }

  public handleMessage(message: TwitchMessage) {
    logger.info(
      `@${message.user.username} -> ${message.channel}: ${message.message}`
    );
    super.handleMessage(message);
  }
}
