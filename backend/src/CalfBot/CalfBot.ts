import ChannelManager from './ChannelManager/ChannelManager';
import { Environment } from '../config';
import { TwitchClient } from '../lib/TwitchClient';
import { UserState, TwitchMessage } from '../models';
import { Logger } from '../Logger';

export default class CalfBot {
  private env: Environment;
  private client: TwitchClient;
  private channelManager: ChannelManager;
  private debug: any;

  constructor(env?: any) {
    this.env = new Environment(env);
    this.debug = this.env.debug;

    this.client = TwitchClient.builder()
      .withOption({ identity: this.env.twitchAuth })
      .on('connected', this.onConnected)
      .on('disconnected', (data) => Logger.info(`Disconnected: ${data}`))
      .on('message', this.onMessage)
      .on('ping', this.onPing)
      .build();

    this.connect();
  }

  private connect(): Promise<any> {
    return this.client
      .connect()
      .then(() => {
        this.channelManager = new ChannelManager(this);
      })
      .catch((err) =>
        Logger.error(`Failed to connect to Twitch server: ${err}`)
      );
  }

  public say(channel: string, message: string): Promise<any> {
    if (!this.debug.debugMode || this.debug.debugChannels.includes(channel))
      return this.client.say(channel, message);
    return Promise.reject('Not sending because of debug mode');
  }

  public toggleChannel = (channelSnap: any) => {
    const { name, active } = channelSnap;
    const channelName = name.toLowerCase();

    if (active) {
      this.joinChannel(channelName);
    } else {
      this.leaveChannel(channelName);
    }
  };

  private joinChannel = (channel: string) => {
    Logger.info(`Attempting to join channel: ${channel}`);

    if (!this.debug.debugMode || this.debug.debugChannels.includes(channel))
      this.client
        .joinChannel(channel)
        .then(() => Logger.info(`Succesfully join channel: ${channel}`))
        .catch((err) =>
          Logger.error(`Failed to join channel ${channel}: ${err}`)
        );
  };

  private leaveChannel = (channel: string) => {
    Logger.info(`Attempting to leave channel: ${channel}`);
    this.client
      .leaveChannel(channel)
      .then(() => Logger.info(`Succesfully left channel: ${channel}`))
      .catch(() => Logger.error(`Failed to leave channel: ${channel}`));
  };

  private onConnected = (data) => {
    Logger.info(`CalfBot connected to server: ${data}`);
  };

  private onMessage = (
    channel: string,
    user: UserState,
    message: string,
    self: boolean
  ) => {
    try {
      const messageObj: TwitchMessage = { channel, user, message, self };
      if (this.channelManager) this.channelManager.handleMessage(messageObj);
    } catch (e) {
      Logger.error(e);
    }
  };

  private onPing = () => {
    Logger.debug('< PING');
    this.client
      .raw('PONG :tmi.twitch.tv')
      .then(() => Logger.debug('> PONG'))
      .catch((e) => Logger.error(e));
  };

  public disconnect(info?: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      await this.client.disconnect();
      if (info === 'SIGTERM') {
        resolve();
      } else {
        Logger.error('Detected unwanted disconnect, reconnecting in 30s');
        setTimeout(async () => {
          await this.connect();
          resolve();
        }, 30 * 1000);
      }
    });
  }
}
