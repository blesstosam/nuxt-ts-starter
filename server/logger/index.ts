import winston from 'winston';
import stringify from 'json-stringify-safe';

export type Logger = {
  debug(name: string | number, meta?: { meta: object }): void;
  info(name: string | number, meta?: { meta: object }): void;
  warn(name: string | number, meta?: { meta: object }): void;
  error(name: string | number, meta?: { meta: object }): void;
};

export type LoggerConfig = {
  level: 'debug' | 'info' | 'warn' | 'error';
};

const defaultCfg: LoggerConfig = {
  level: 'info',
};

/* eslint-disable-next-line */
export let logger = {
  ...console,
  /* eslint-disable-next-line */
  debug: console.log,
} as Logger;

const myFormat = winston.format.printf((info) => {
  const { timestamp, label, level, message, meta } = info;

  let metaStr = '';
  if (meta) {
    metaStr = ` - ${stringify(meta)}`;
  }
  return `${timestamp} [${label}] ${level}: ${message}${metaStr}`;
});

export function createLogger(cfg: LoggerConfig): Logger {
  const c = { ...defaultCfg, ...cfg };

  let transports: Array<any> = [
    new winston.transports.Console({
      ...(process.env.NODE_ENV !== 'production'
        ? {
            format: winston.format.combine(
              winston.format.colorize(),
              winston.format.simple(),
              myFormat
            ),
          }
        : {}),
    }),
  ];
  // 如果是生产环境 需要写到文件里去
  if (process.env.NODE_ENV === 'production') {
    transports = [
      ...transports,
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ];
  }

  logger = winston.createLogger({
    format: winston.format.combine(
      winston.format.label({ label: 'koa-server' }),
      winston.format.json(),
      winston.format.timestamp()
    ),
    level: c.level,
    transports,
  });
  return logger;
}

const loggerInstance = createLogger({ level: 'info' });
export { loggerInstance };
