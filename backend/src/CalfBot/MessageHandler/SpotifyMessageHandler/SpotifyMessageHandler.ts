import AbstractMessageHandler from '../AbstractMessageHandler/AbstractMessageHandler';
import { Firebase } from '../../../lib/Firebase';
import { CalfBot } from '../../index';
import { Logger } from '../../../Logger';
import Spotify from '../../../lib/Spotify/Spotify';
import { TwitchMessage, Track } from '../../../models';

const logger = Logger.getInstance('SpotifyMessageHandler');

class SpotifyMessageHandler extends AbstractMessageHandler {
  private firebase: Firebase;
  private bot: CalfBot;
  private channel: any;
  private channelName: string;
  private spotify: Spotify;

  constructor(bot: CalfBot, channel: any) {
    super();
    this.bot = bot;
    this.firebase = Firebase.getInstance();
    this.channel = channel;
    this.channelName = channel.name.toLowerCase();

    this.firebase.channelData
      .child(`/${this.channel.uid}`)
      .child('spotify')
      .on('value', (snap) => {
        const val = snap.val();
        this.setupCommands(val);
      });
  }

  private setupCommands(settings) {
    logger.debug(`Setting up spotify commands for ${this.channelName}`);
    this.commands = [];
    const { access_token, refresh_token } = settings.tokens;
    const { song, lastSong } = settings.commands;
    if (access_token && refresh_token) {
      this.spotify = new Spotify(access_token, refresh_token);
      if (song && song.enabled) {
        this.addCommand({
          command: '!song',
          handler: this.currentSong(song.response),
          lastUsedAt: 0,
          cooldown: 30 * 1000,
        });
      }
      if (lastSong && lastSong.enabled) {
        this.addCommand({
          command: '!lastsong',
          handler: this.lastSong(lastSong.response),
          lastUsedAt: 0,
          cooldown: 30 * 1000,
        });
      }
    }
  }

  private currentSong = (response: string) => (message: TwitchMessage) => {
    if (this.spotify)
      this.spotify.getCurrentTrack().then((item?: Track) => {
        let sendMessage = '';
        if (!item) {
          sendMessage = `${
            this.channel.name
          } is not currently playing anything on spotify`;
        } else {
          sendMessage = this.spotifyVariables(response, message, item);
        }
        this.bot
          .say(this.channelName, sendMessage)
          .catch((err) => logger.error(`${err}`));
        logger.info(`Spotify: ${sendMessage}`);
      });
  };

  private lastSong = (response: string) => (message: TwitchMessage) => {
    if (this.spotify)
      this.spotify.getRecentTracks().then((items?: Track[]) => {
        let sendMessage = '';
        if (!items || !items.length) {
          sendMessage = `${
            this.channel.name
          } has not played anything on spotify recently`;
        } else {
          sendMessage = this.spotifyVariables(response, message, items[0]);
        }
        logger.info(`Spotify: ${sendMessage}`);
        this.bot
          .say(this.channelName, sendMessage)
          .catch((err) => logger.error(`Spotify: ${err}`));
      });
  };

  private spotifyVariables = (
    response: string,
    message: TwitchMessage,
    track: Track
  ): string => {
    return response
      .replace('%songname%', track.name)
      .replace('%artist%', track.artists[0].name)
      .replace('%user%', message.user.username)
      .replace(
        '%link%',
        (track.external_urls && track.external_urls.spotify) || track.uri
      );
  };
}

export default SpotifyMessageHandler;
