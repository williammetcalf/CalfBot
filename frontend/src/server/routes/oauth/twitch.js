import Environment from '../../../config/Environment';
import axios from 'axios';
import * as admin from 'firebase-admin';

const env = new Environment();

admin.initializeApp({
  credential: admin.credential.cert(env.fbServiceAccount),
  databaseURL: `https://${env.fbServiceAccount.project_id}.firebaseio.com/`,
});

const twitchAuth = async (req, res) => {
  const { clientId, clientSecret, redirectUri } = env.twitchAuth;
  const code = req.query.code;
  try {
    const { data } = await axios.post(
      `https://api.twitch.tv/kraken/oauth2/token?` +
        `client_id=${clientId}&` +
        `client_secret=${clientSecret}&` +
        `code=${code}&` +
        `grant_type=authorization_code&` +
        `redirect_uri=${redirectUri}`
    );
    const userInfo = await getUserInfo(data);
    const id = `twitch:${userInfo._id}`;

    await updateUser(userInfo, id);
    await authenticateUser(userInfo, id);
    const token = await getAuthToken(id);
    res.send(token);
  } catch (err) {
    console.error(err);
  }
};

const getUserInfo = async (auth) => {
  const endpoint = 'https://api.twitch.tv/kraken/user';
  try {
    const { data } = await axios.get(endpoint, {
      headers: {
        'Client-ID': env.twitchAuth.clientId,
        Authorization: `OAuth ${auth.access_token}`,
      },
    });
    return data;
  } catch (err) {
    throw err;
  }
};

const updateUser = async (userInfo, id) => {
  try {
    return await admin
      .database()
      .ref(`/user/${id}`)
      .set(userInfo);
  } catch (err) {
    throw err;
  }
};

const authenticateUser = async (userInfo, id) => {
  try {
    return await admin.auth().updateUser(id, {
      displayName: userInfo.display_name,
    });
  } catch (err) {
    // new user
    try {
      return await admin.auth().createUser({
        uid: id,
        displayName: userInfo.display_name,
      });
    } catch (err) {
      throw err;
    }
  }
};

const getAuthToken = async (id) => {
  try {
    const token = await admin.auth().createCustomToken(id);
    return token;
  } catch (err) {
    throw err;
  }
};

export default twitchAuth;
