import TwitchClient from './TwitchClient';
import { client } from 'tmi.js';
import { TwitchClientBuilder } from './TwitchClientBuilder';

jest.mock('tmi.js');

describe('TwitchClient', () => {
  it('should be able to be constructed with a tmi.js client', () => {
    expect(() => new TwitchClient(new client())).not.toThrow();
  });

  it('connect should call connect on the client', () => {
    const connect = jest.fn();
    client['mockImplementationOnce'](() => ({
      connect,
    }));
    const twitchClient = new TwitchClient(new client());
    twitchClient.connect();

    expect(connect).toHaveBeenCalled();
  });

  it('joinChannel should call join on the client', () => {
    const join = jest.fn();
    client['mockImplementationOnce'](() => ({
      join,
    }));
    const twitchClient = new TwitchClient(new client());
    twitchClient.joinChannel('test');

    expect(join).toHaveBeenCalledWith('test');
  });

  it('leaveChannel should call part on the client', () => {
    const part = jest.fn();
    client['mockImplementationOnce'](() => ({
      part,
    }));
    const twitchClient = new TwitchClient(new client());
    twitchClient.leaveChannel('test');

    expect(part).toHaveBeenCalledWith('test');
  });

  it('ping should call ping on the client', () => {
    const ping = jest.fn();
    client['mockImplementationOnce'](() => ({
      ping,
    }));
    const twitchClient = new TwitchClient(new client());
    twitchClient.ping();

    expect(ping).toHaveBeenCalled();
  });

  it('say should call say on the client', () => {
    const say = jest.fn();
    client['mockImplementationOnce'](() => ({
      say,
    }));
    const twitchClient = new TwitchClient(new client());
    twitchClient.say('channel', 'message');

    expect(say).toHaveBeenCalledWith('channel', 'message');
  });

  it('raw should call raw on the client', () => {
    const raw = jest.fn();
    client['mockImplementationOnce'](() => ({
      raw,
    }));
    const twitchClient = new TwitchClient(new client());
    twitchClient.raw('test');

    expect(raw).toHaveBeenCalledWith('test');
  });

  it('builder should return a new TwitchClientBuilder', () => {
    const builder = TwitchClient.builder();

    expect(builder).toMatchObject(new TwitchClientBuilder());
  });
});
