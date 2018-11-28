import {
  SpotifyApiCredentials,
  FirebaseServiceAccount,
  DebugSettings,
  TwitchCredentials,
} from '../../models';

export default class Environment {
  private env: any;
  constructor(env: any = process.env) {
    this.env = env;
  }

  get debug(): DebugSettings {
    return {
      debugMode: JSON.parse(this.env.DEBUG_MODE),
      debugChannels: this.env.DEBUG_CHANNELS.split(','),
    };
  }

  get twitchAuth(): TwitchCredentials {
    return {
      username: this.env.USER_NAME,
      password: this.env.AUTH_TOKEN,
    };
  }

  get spotifyAuth(): SpotifyApiCredentials {
    return {
      clientId: this.env.SPOTIFY_CLIENT_ID,
      clientSecret: this.env.SPOTIFY_CLIENT_SECRET,
      redirectUri: this.env.SPOTIFY_REDIRECT_URI,
    };
  }

  get firebaseServiceAccount(): FirebaseServiceAccount {
    return {
      type: this.env.FB_TYPE,
      project_id: this.env.FB_PROJECT_ID,
      private_key_id: this.env.FB_PRIVATE_KEY_ID,
      private_key: this.env.FB_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: this.env.FB_CLIENT_EMAIL,
      client_id: this.env.FB_CLIENT_ID,
      auth_uri: this.env.FB_AUTH_URI,
      token_uri: this.env.FB_TOKEN_URI,
      auth_provider_x509_cert_url: this.env.FB_AUTH_PROVIDER_CERT_URL,
      client_x509_cert_url: this.env.FB_CLIENT_CERT_URL,
    };
  }

  get vRate(): string {
    return this.env.VRATE_API_KEY;
  }
}
