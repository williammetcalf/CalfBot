import axios from 'axios';
import Firebase from '../Firebase/Firebase';
import { Logger } from '../../Logger';
import Environment from '../../config/Environment/Environment';

const logger = Logger.getInstance('VRate Client');
const env = new Environment();

const headers = {
  'X-Mashape-Key': env.vRate,
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const vrate = Firebase.getInstance().vrate;

export const testNSFW = async (url: string): Promise<any> => {
  try {
    await canVRate();
    const response = await axios.post(
      `https://vrate.p.mashape.com/mediarating`,
      { payload: url },
      { headers }
    );
    return response;
  } catch (e) {
    throw new Error();
  }
};

const canVRate = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    vrate.once(
      'value',
      (snap) => {
        if (snap.exists()) {
          const val = snap.val();
          const counter = +val.counter;
          const lastReset = new Date(val.lastReset);
          const resetTime = lastReset.getTime() + 30 * 24 * 60 * 60 * 1000;

          if (resetTime < new Date().getTime()) {
            resetVRate();
          }

          if (counter < 7000) {
            vrate.update({ counter: counter + 1 });
            resolve();
          } else {
            logger.warn('Over VRate count limit');
            reject();
          }
        } else {
          resetVRate();
          resolve();
        }
      },
      () => reject()
    );
  });
};

const resetVRate = () => {
  logger.info('Reseting VRate');
  vrate.update({ counter: 0, lastReset: new Date() });
};
