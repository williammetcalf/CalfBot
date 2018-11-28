// Twitch tmi.js
declare module "tmi.js" {
  class client {
    constructor(opts?: any);
    public on(event?: string, callback?: Function): void;
    public connect(): Promise<any>;
    public channels: string[];
    public opts: any;
    public join(channel: string): Promise<any>;
    public part(channel: string): Promise<any>;
    public ping(): Promise<any>;
    public say(channel: string, message: string): Promise<any>;
    public raw(message: string): Promise<any>;
    public disconnect(): Promise<any>;
  }
}

// Spotify Api
declare module "spotify-web-api-node" {
  class SpotifyWebApi {
    constructor(credentials?: any);
    setCredentials(credentials: any): void;
    setAccessToken(token: string): void;
    setRefreshToken(token: string): void;
    refreshAccessToken(): Promise<{ body: { access_token: string } }>;
    getMyCurrentPlayingTrack(opts?: any): Promise<{ body: any }>;
    getMyRecentlyPlayedTracks(opts?: any): Promise<{ body: any }>;
  }

  export default SpotifyWebApi;
}

// Firebase-Admin
declare module "firebase-admin" {
  var admin: {
    initializeApp: Function;
    credential: { cert: Function };
    database: () => { ref: (path: string) => FirebaseDbRef };
  };

  class FirebaseDbRef {
    public on(
      event: string,
      success?: (snap: any) => void,
      failure?: (err: any) => void
    );
    public once(
      event: string,
      success?: (snap: any) => void,
      failure?: (err: any) => void
    );
    public child(path: string): FirebaseDbRef;
    public update(value: any): Promise<any>;
  }

  export default admin;
  export { FirebaseDbRef };
}
