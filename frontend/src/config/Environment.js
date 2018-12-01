export default class Environment {
  constructor(env = process.env) {
    this.env = env;
  }

  get twitchAuth() {
    return {
      clientId: this.env.F_TWITCH_CLIENT_ID,
      clientSecret: this.env.F_TWITCH_CLIENT_SECRET,
      redirectUri: this.env.F_TWITCH_REDIRECT_URI,
    };
  }

  get spotifyAuth() {
    return {
      clientId: this.env.F_SPOTIFY_CLIENT_ID,
      clientSecret: this.env.F_SPOTIFY_CLIENT_SECRET,
      redirectUri: this.env.F_SPOTIFY_REDIRECT_URI,
    };
  }

  get fbServiceAccount() {
    return {
      type: this.env.F_FB_TYPE,
      project_id: this.env.F_FB_PROJECT_ID,
      private_key_id: this.env.F_FB_PRIVATE_KEY_ID,
      private_key: this.env.F_FB_PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: this.env.F_FB_CLIENT_EMAIL,
      client_id: this.env.F_FB_CLIENT_ID,
      auth_uri: this.env.F_FB_AUTH_URI,
      token_uri: this.env.F_FB_TOKEN_URI,
      auth_provider_x509_cert_url: this.env.F_FB_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: this.env.F_FB_CLIENT_X509_CERT_URL,
    };
  }

  get fbPublicAuth() {
    return {
      apiKey: this.env.F_FB_PUB_API_KEY,
      authDomain: this.env.F_FB_PUB_AUTH_DOMAIN,
      databaseURL: this.env.F_FB_PUB_DATABASE_URL,
      projectId: this.env.F_FB_PUB_PROJECT_ID,
      storageBucket: this.env.F_FB_PUB_STORAGE_BUCKET,
      messagingSenderId: this.env.F_FB_PUB_MESSAGING_SENDER_ID,
    };
  }

  get public() {
    return {
      twitch: this.twitchAuth,
      firebase: this.fbPublicAuth,
    };
  }
}
