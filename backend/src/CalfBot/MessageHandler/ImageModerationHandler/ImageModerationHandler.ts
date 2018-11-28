import { TwitchMessage } from './../../../models/Twitch';
import AbstractMessageHandler from '../AbstractMessageHandler/AbstractMessageHandler';
import urlRegex from 'url-regex';
import { testNSFW } from '../../../lib/VRateClient/VRateClient';
import { Logger } from '../../../Logger';
import CalfBot from '../../CalfBot';

const logger = Logger.getInstance('VRate');

class ImageModerationHandler extends AbstractMessageHandler {
  private bot: CalfBot;
  private channelName: string;

  constructor(bot: CalfBot, channel: any) {
    super();
    this.bot = bot;
    this.channelName = channel.name.toLowerCase();
  }

  handleMessage = (message: TwitchMessage) => {
    const urls = (message.message.match(urlRegex()) as string[]) || [];
    const imageUrls = urls.filter(imageUrlsFilter);
    imageUrls.forEach(async (url) => {
      try {
        logger.info(`Sending url to vRate: ${url}`);
        const resp = await testNSFW(url);
        logger.debug(JSON.stringify(resp.data));
        const { RatingCode, Confidence } = resp.data;
        if (RatingCode === 'V03' && Confidence === 'High') {
          logger.info(`Banning ${message.user.username} for ${url}`);
          this.bot.say(
            this.channelName.toLowerCase(),
            // `/ban ${message.user.username} nsfw image: ${url}`
            `@${message.user.username} is that a penis?`
          );
        }
      } catch (e) {
        logger.error(
          JSON.stringify(
            (e.response && e.response.data) ||
              'probably over rate vRate rate limit'
          )
        );
      }
    });
  };
}

const imageUrls = ['imgur', 'b2wblog'];
const imageExtensions = ['.jpg', '.jpeg', '.png'];
const imageUrlsFilter = (url: string) =>
  !!imageUrls.find((imgUrl) => url.indexOf(imgUrl) >= 0) &&
  !!imageExtensions.find((ext) => url.endsWith(ext));

export default ImageModerationHandler;
