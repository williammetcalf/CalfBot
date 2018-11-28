import { TwitchMessage } from './index';

export interface Command {
  command: string;
  handler: (message: TwitchMessage) => any;
  lastUsedAt?: number;
  cooldown?: number;
}
