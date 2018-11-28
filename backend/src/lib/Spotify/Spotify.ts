import SpotifyWebApi from 'spotify-web-api-node';
import { Environment } from '../../config';
import { Track, SpotifyApiCredentials } from '../../models';
import { Logger } from '../../Logger';

const logger = Logger.getInstance('Spotify');

export default class Spotify {
  private env: Environment;

  private _spotifyApi: SpotifyWebApi;

  constructor(
    accessToken,
    refreshToken,
    env?: { spotifyAuth: SpotifyApiCredentials }
  ) {
    this.env = new Environment(env);

    this._spotifyApi = new SpotifyWebApi(this.env.spotifyAuth);
    this._spotifyApi.setAccessToken(accessToken);
    this._spotifyApi.setRefreshToken(refreshToken);
  }

  public async getCurrentTrack(opts?: any): Promise<Track> {
    logger.debug('getCurrentTrack');
    const response = await this.attemptApiCall<{ body: { item: Track } }>(() =>
      this._spotifyApi.getMyCurrentPlayingTrack(opts)
    );
    return response.body.item;
  }

  public async getRecentTracks(opts: any = { limit: 3 }): Promise<Track[]> {
    logger.debug('getRecentTracks');
    const response = await this.attemptApiCall<{
      body: { items: { track: Track }[] };
    }>(() => this._spotifyApi.getMyRecentlyPlayedTracks(opts));
    return response.body.items.map((item) => item.track);
  }

  public async attemptApiCall<T>(apiCall, isRetry = false): Promise<T> {
    try {
      const response = await apiCall();
      return Promise.resolve(response);
    } catch (err) {
      if (!isRetry) {
        logger.warn('Failed Spotify request, refreshing token then retrying');
        await this.refreshTokens();
        return await this.attemptApiCall<T>(apiCall, true);
      }
      logger.error(`Failed Spotify request after retry: ${err}`);
      return Promise.reject(err);
    }
  }

  public async refreshTokens(): Promise<string> {
    try {
      const response = await this._spotifyApi.refreshAccessToken();
      const newToken = response.body.access_token;
      this._spotifyApi.setAccessToken(newToken);
      logger.debug('Succesfully refreshed token');
      return Promise.resolve(newToken);
    } catch (err) {
      logger.error(`Failed to refresh Spotify access token: ${err}`);
      return Promise.reject(err);
    }
  }

  public get spotifyClient(): SpotifyWebApi {
    return this._spotifyApi;
  }
}
