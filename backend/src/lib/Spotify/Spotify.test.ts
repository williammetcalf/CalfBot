import Spotify from './Spotify';

jest.mock('../Logger/Logger', () => ({
  getInstance: () => ({
    info: () => {},
    error: () => {},
  }),
}));
jest.mock('spotify-web-api-node');

describe('Spotify', () => {
  it('should be able to be constructed', () => {
    const accessToken = 'access_token';
    const refreshToken = 'refresh_token';
    const spotify = new Spotify(accessToken, refreshToken);
    const client = spotify.spotifyClient;

    expect(client.setAccessToken).toHaveBeenCalledWith(accessToken);
    expect(client.setRefreshToken).toHaveBeenCalledWith(refreshToken);
  });

  it('refreshToken should get and set the new token', async () => {
    const spotify = new Spotify('access_token', 'refresh_token');
    spotify.spotifyClient.refreshAccessToken['mockReturnValueOnce'](
      Promise.resolve({ body: { access_token: 'new token' } })
    );

    await spotify.refreshTokens();

    expect(spotify.spotifyClient.setAccessToken).toHaveBeenCalledWith(
      'new token'
    );
  });

  it('refreshToken handle refresh failures', async () => {
    const spotify = new Spotify('access_token', 'refresh_token');
    spotify.spotifyClient.refreshAccessToken['mockReturnValueOnce'](
      Promise.reject('some error')
    );
    await expect(spotify.refreshTokens()).rejects.toEqual('some error');
  });

  it('attemptApiCall should resolve with the response on the first attempt if possible', async () => {
    const apiCall = () => Promise.resolve('My response');
    const spotify = new Spotify('access_token', 'refresh_token');
    const response = await spotify.attemptApiCall<string>(apiCall);

    expect(response).toEqual('My response');
  });

  it('attemptApiCall should refresh the token and retry once', async () => {
    const apiCall = jest
      .fn()
      .mockRejectedValueOnce(new Error('first fail'))
      .mockResolvedValueOnce('test');

    const spotify = new Spotify('access_token', 'refresh_token');
    spotify.spotifyClient.refreshAccessToken['mockResolvedValueOnce']({
      body: { access_token: 'new token' },
    });

    const ret = await spotify.attemptApiCall(apiCall);
    expect(ret).toBe('test');
    expect(spotify.spotifyClient.refreshAccessToken).toHaveBeenCalled();
  });

  it('attemptApiCall should throw and error if it fails when retrying', async () => {
    const apiCall = jest
      .fn()
      .mockRejectedValueOnce(new Error('first fail'))
      .mockRejectedValueOnce(new Error('second fail'));

    const spotify = new Spotify('access_token', 'refresh_token');
    spotify.spotifyClient.refreshAccessToken['mockResolvedValueOnce']({
      body: { access_token: 'new token' },
    });

    await expect(spotify.attemptApiCall(apiCall)).rejects.toEqual(
      new Error('second fail')
    );
  });
});
