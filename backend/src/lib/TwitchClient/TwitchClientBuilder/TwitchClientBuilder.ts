import { client } from 'tmi.js';
import { TmiEventType } from '../../../models';
import { TwitchClient } from '../index';

export default class TwitchClientBuilder {
  private _channels: string[] = [];
  private _handlers: Handler[] = [];
  private _options: any = {};

  public clone(): TwitchClientBuilder {
    const newBuilder = new TwitchClientBuilder();
    newBuilder._channels = this.channels;
    newBuilder._handlers = this.handlers;
    newBuilder._options = this.options;

    return newBuilder;
  }

  public withChannel(...channel: string[]) {
    const cloned = this.clone();
    cloned._channels.push(...channel);

    return cloned;
  }

  public on(event: TmiEventType, handler: Function) {
    const cloned = this.clone();
    cloned._handlers.push({ event, handler });

    return cloned;
  }

  public withOption(option: any) {
    const cloned = this.clone();

    cloned._options = { ...cloned._options, ...option };
    return cloned;
  }

  public build() {
    const builtClient = new client(this._options);
    builtClient.channels = this._channels;
    this._handlers.forEach((handler: Handler) => {
      builtClient.on(handler.event, handler.handler);
    });

    return new TwitchClient(builtClient);
  }

  public get channels(): string[] {
    return [...this._channels];
  }

  public get handlers(): Handler[] {
    return [...this._handlers];
  }

  public get options(): any {
    return { ...this._options };
  }
}

type Handler = { event: TmiEventType; handler: Function };
