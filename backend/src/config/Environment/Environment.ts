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
      debugMode: JSON.parse(this.env.B_DEBUG_MODE),
      debugChannels: this.env.B_DEBUG_CHANNELS.split(','),
    };
  }

  get twitchAuth(): TwitchCredentials {
    return {
      username: this.env.B_USER_NAME,
      password: this.env.B_AUTH_TOKEN,
    };
  }

  get spotifyAuth(): SpotifyApiCredentials {
    return {
      clientId: this.env.B_SPOTIFY_CLIENT_ID,
      clientSecret: this.env.B_SPOTIFY_CLIENT_SECRET,
      redirectUri: this.env.B_SPOTIFY_REDIRECT_URI,
    };
  }

  get firebaseServiceAccount(): FirebaseServiceAccount {
    return {
      type: this.env.B_FB_TYPE,
      project_id: this.env.B_FB_PROJECT_ID,
      private_key_id: this.env.B_FB_PRIVATE_KEY_ID,
      private_key: this.env.B_FB_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: this.env.B_FB_CLIENT_EMAIL,
      client_id: this.env.B_FB_CLIENT_ID,
      auth_uri: this.env.B_FB_AUTH_URI,
      token_uri: this.env.B_FB_TOKEN_URI,
      auth_provider_x509_cert_url: this.env.B_FB_AUTH_PROVIDER_CERT_URL,
      client_x509_cert_url: this.env.B_FB_CLIENT_CERT_URL,
    };
  }

  get vRate(): string {
    return this.env.B_VRATE_API_KEY;
  }
}
