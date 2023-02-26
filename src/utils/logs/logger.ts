import {logger} from 'react-native-logs';

const defaultConfig = {
  transportOptions: {
    colors: {
      debug: 'green',
      info: 'blueBright',
      warn: 'yellowBright',
      error: 'redBright',
    },
  },
};

const log = logger.createLogger(defaultConfig);

export class Logger {
  private static instance: Logger;

  private constructor() {
    // private constructor necessary to prevent instantiation.
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public debug(value: string): void {
    log.debug(value);
  }

  public warn(value: string): void {
    log.warn(value);
  }

  public info(value: string): void {
    log.info(value);
  }

  public error(value: string): void {
    log.error(value);
  }
}
