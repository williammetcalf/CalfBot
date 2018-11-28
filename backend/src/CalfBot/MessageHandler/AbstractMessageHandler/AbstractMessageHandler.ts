import { Command, TwitchMessage } from '../../../models';

abstract class AbstractMessageHandler {
  protected messageHandlers: AbstractMessageHandler[];
  protected commands: Command[];

  constructor() {
    this.messageHandlers = [];
    this.commands = [];
  }

  public handleMessage(message: TwitchMessage) {
    this.commands.forEach((command) => {
      if (message.message.toLowerCase().startsWith(command.command)) {
        const nextUse = (command.lastUsedAt || 0) + (command.cooldown || 0);
        if (nextUse < new Date().getTime()) {
          command.handler(message);
          command.lastUsedAt = new Date().getTime();
        }
      }
    });
    this.messageHandlers.forEach((handler) => handler.handleMessage(message));
  }

  public addMessageHandler(handler: AbstractMessageHandler) {
    this.messageHandlers.push(handler);
  }

  public addCommand(command: Command) {
    this.commands.push(command);
  }
}

export default AbstractMessageHandler;
