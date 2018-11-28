import moment from 'moment-timezone';
import Winston from 'winston';

export default class Logger {
  private static instance: Logger;

  public static info(message: string) {
    Logger.getInstance().info(message);
  }

  public static error(error: string | Error) {
    Logger.getInstance().error(error);
  }

  public static debug(message: string) {
    Logger.getInstance().debug(message);
  }

  public static warn(message: string) {
    Logger.getInstance().warn(message);
  }

  public static getInstance(prefix?: string): Logger {
    if (prefix) return new Logger(prefix);

    if (Logger.instance) {
      return Logger.instance;
    }
    Logger.instance = new Logger();
    return Logger.instance;
  }

  private logger: Winston.Logger;

  private constructor(prefix?: string) {
    const label = prefix ? `${prefix}: ` : '';
    this.logger = Winston.createLogger({
      level: 'debug',
      format: Winston.format.combine(
        Winston.format.label({ label }),
        Winston.format.timestamp(),
        Winston.format.printf(
          (info) => `${info.level}: ${now()} -- ${info.label}${info.message}`
        )
      ),
      transports: [new Winston.transports.Console()],
    });
  }

  public info(message: string) {
    this.logger.info(message);
  }

  public error(error: string | Error) {
    this.logger.error(`${error}`);
  }

  public debug(message: string) {
    this.logger.debug(message);
  }

  public warn(message: string) {
    this.logger.warn(message);
  }
}

const now = () =>
  moment(new Date())
    .tz('America/Indiana/Indianapolis')
    .format('MM-DD-YYYY h:mm:ssa');
