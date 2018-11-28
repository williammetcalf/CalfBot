import { CalfBot } from '../index';
import { Firebase } from '../../lib/Firebase';
import { MessageHandler } from '../MessageHandler';
import { TwitchMessage } from '../../models';
import { Logger } from '../../Logger';

export default class ChannelManager {
  private bot: CalfBot;
  private firebase: Firebase;
  private chatManagers: any = {};

  constructor(bot: CalfBot) {
    this.bot = bot;
    this.firebase = Firebase.getInstance();

    this.listenToActiveChannels();
  }

  public handleMessage = (message: TwitchMessage) => {
    if (message.self) return;
    const { channel } = message;

    const handler = this.chatManagers[channel.substring(1)];
    handler && handler.handleMessage(message);
  };

  private channelToggeled = (channel) => {
    this.bot.toggleChannel(channel);
    if (channel.active) this.channelAdded(channel);
    else this.channelRemoved(channel);
  };

  private channelAdded = (channel) => {
    const channelName = channel.name.toLowerCase();
    this.chatManagers[channelName] = new MessageHandler(this.bot, channel);
  };

  private channelRemoved = (channel) => {
    delete this.chatManagers[channel.name];
  };

  private activeChannelAdded = (snap) => {
    const val = snap.val();
    Logger.info(
      `New active channel entry: ${val.name} :: ${val.active ? '' : 'in'}active`
    );

    this.channelToggeled(val);
  };

  private activeChannelChanged = (snap) => {
    const val = snap.val();
    Logger.info(
      `Modified active channel entry: ${val.name} :: active-${val.active}`
    );

    this.channelToggeled(val);
  };

  private activeChannelRemoved = (snap) => {
    const val = snap.val();
    Logger.info(`Remove active channel entry: ${val.name} :'(`);

    this.channelToggeled(val);
  };

  private listenToActiveChannels = () => {
    this.firebase.activeChannels.on(
      'child_added',
      this.activeChannelAdded,
      this.handleError
    );
    this.firebase.activeChannels.on(
      'child_changed',
      this.activeChannelChanged,
      this.handleError
    );
    this.firebase.activeChannels.on(
      'child_removed',
      this.activeChannelRemoved,
      this.handleError
    );
  };

  private handleError = (err) => {
    Logger.error(err);
  };
}
