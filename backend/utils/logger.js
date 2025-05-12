import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { inspect } from 'util';

const { combine, timestamp, printf, colorize, align } = winston.format;

const customFormatter = printf(({ level, message, timestamp, ...metadata }) => {
  let msg = `${timestamp} [${level}]: ${message}`;
  
  if (metadata && Object.keys(metadata).length > 0) {
    msg += ` ${inspect(metadata, {
      colors: true,
      depth: 5,
      compact: false,
      breakLength: Infinity
    })}`;
  }
  
  return msg;
});

const consoleFormat = combine(
  colorize({ all: true }),
  timestamp({
    format: 'YYYY-MM-DD HH:mm:ss.SSS'
  }),
  align(),
  customFormatter
);

const fileFormat = combine(
  timestamp({
    format: 'YYYY-MM-DD HH:mm:ss.SSS'
  }),
  align(),
  customFormatter
);

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

winston.addColors(colors);

const logger = winston.createLogger({
  levels,
  level: process.env.LOG_LEVEL || 'info',
  transports: [
    new winston.transports.Console({
      format: consoleFormat,
      handleExceptions: true,
      handleRejections: true
    }),
    new DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '30d',
      level: 'error',
      format: fileFormat
    }),
    new DailyRotateFile({
      filename: 'logs/combined-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '30d',
      format: fileFormat
    })
  ],
  exitOnError: false
});

logger.stream = {
  write: (message) => {
    logger.http(message.trim());
  },
};

logger.exceptions.handle(
  new DailyRotateFile({
    filename: 'logs/exceptions-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d',
    format: fileFormat
  })
);

logger.rejections.handle(
  new DailyRotateFile({
    filename: 'logs/rejections-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d',
    format: fileFormat
  })
);

logger.withRequest = (req) => {
  return {
    error: (message, meta) => logger.error(message, { ...meta, requestId: req.id, path: req.path }),
    warn: (message, meta) => logger.warn(message, { ...meta, requestId: req.id, path: req.path }),
    info: (message, meta) => logger.info(message, { ...meta, requestId: req.id, path: req.path }),
    http: (message, meta) => logger.http(message, { ...meta, requestId: req.id, path: req.path }),
    debug: (message, meta) => logger.debug(message, { ...meta, requestId: req.id, path: req.path }),
  };
};

logger.query = (query) => {
  logger.debug('Database Query', {
    collection: query.collection,
    method: query.method,
    criteria: query.criteria,
    options: query.options,
    duration: `${query.duration}ms`
  });
};

export default logger;