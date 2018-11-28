import { CalfBot } from './src/CalfBot';
import { Logger } from './src/Logger';

if (process.env.NEW_RELIC_LICENSE_KEY) {
  require('newrelic');
}

const bot = new CalfBot();

process.on('SIGTERM', () => {
  Logger.info('Starting Graceful Disconnect');
  bot.disconnect('SIGTERM').then(() => {
    Logger.info('Gracefully Disconnected');
  });
});