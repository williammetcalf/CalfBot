import { parse } from 'querystring';
import axios from 'axios';

export const twitchAuth = async (code) => {
  const codeUri =
    `https://id.twitch.tv/oauth2/authorize?` +
    `client_id=${window.env.twitch.clientId}&` +
    `redirect_uri=${window.env.twitch.redirectUri}&` +
    `response_type=code&` +
    `scope=openid user_read&`;
  const token = await oauth(codeUri, '/auth/twitch');
  return token.data;
};

export const oauth = async (codeUrl, tokenUrl) => {
  const code = await getCode(codeUrl);
  const resp = await axios.get(`${tokenUrl}?code=${code}`);
  return resp;
};

const getCode = (codeUrl) => {
  const authWindow = window.open(codeUrl);

  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      const code = extractCode(authWindow);
      if (code) {
        authWindow.close();
        clearInterval(interval);
        resolve(code);
      }
    }, 200);
  });
};

const extractCode = (window) => {
  if (window && window.location && window.location.search) {
    const rawSearch = window.location.search;
    const search = rawSearch.startsWith('?')
      ? rawSearch.substring(1)
      : rawSearch;

    const parsed = parse(search);
    if (parsed.code) return parsed.code;
  }
  return null;
};
