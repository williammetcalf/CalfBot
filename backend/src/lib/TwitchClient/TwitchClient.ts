import { client } from 'tmi.js';
import { TwitchClientBuilder } from './TwitchClientBuilder';

export default class TwitchClient {
  static builder = () => new TwitchClientBuilder();

  private bot: client;

  constructor(bot: client) {
    this.bot = bot;
  }

  public connect(): Promise<any> {
    return this.bot.connect();
  }

  public joinChannel = (channel: string): Promise<any> => {
    return this.bot.join(channel);
  };

  public leaveChannel = (channel: string): Promise<any> => {
    return this.bot.part(channel);
  };

  public ping = (): Promise<any> => {
    return this.bot.ping();
  };

  public say = (channel: string, message: string): Promise<any> => {
    return this.bot.say(channel, message);
  };

  public raw = (message: string): Promise<any> => {
    return this.bot.raw(message);
  };

  public disconnect = (): Promise<any> => {
    return this.bot.disconnect();
  };
}
