import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Observable } from 'rxjs';

class UserService {
  static instance = null;
  static getInstance = () => {
    if (!UserService.instance) UserService.instance = new UserService();
    return UserService.instance;
  };

  constructor() {
    this.user = null;

    firebase.initializeApp(window.env.firebase);

    this._$user = Observable.create((obs) =>
      firebase.auth().onAuthStateChanged((auth) => {
        this.user = !!auth
          ? { uid: auth.uid, displayName: auth.displayName }
          : null;

        obs.next(this.user);
      })
    );
  }

  login(token) {
    firebase.auth().signInWithCustomToken(token);
  }

  logout() {
    firebase.auth().signOut();
  }

  get $user() {
    return this._$user;
  }

  get isLoggedIn() {
    return !!this.user;
  }

  get currentUser() {
    return this.user;
  }
}

export default UserService;
