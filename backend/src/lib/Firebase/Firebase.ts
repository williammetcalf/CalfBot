import admin, { FirebaseDbRef } from 'firebase-admin';
import { Environment } from '../../config';
import { Logger } from '../../Logger';

export default class Firebase {
  private static instance: Firebase;
  private env: Environment;
  private _activeChannels: FirebaseDbRef;
  private _channelData: FirebaseDbRef;
  private _vrate: FirebaseDbRef;

  private constructor(env?: any) {
    Logger.info('Initializing firebase for the first time');

    this.env = new Environment(env);
    const serviceAccount = this.env.firebaseServiceAccount;

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
    });

    const db = admin.database();

    this._activeChannels = db.ref('/activeChannels');
    this._channelData = db.ref('/userSettings');
    this._vrate = db.ref('/vrate');
  }

  public get activeChannels(): FirebaseDbRef {
    return this._activeChannels;
  }

  public get channelData(): FirebaseDbRef {
    return this._channelData;
  }

  public get vrate(): FirebaseDbRef {
    return this._vrate;
  }

  static getInstance(env?: any) {
    if (Firebase.instance) {
      return Firebase.instance;
    }
    Firebase.instance = new Firebase(env);
    return Firebase.instance;
  }
}
