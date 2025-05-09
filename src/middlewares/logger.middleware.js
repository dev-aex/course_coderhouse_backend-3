import winston from 'winston';

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ level: 'http' }),
    new winston.transports.Console({ level: 'info' }),
    new winston.transports.Console({ level: 'debug' }),
    new winston.transports.File({
      filename: './logs/errors.log',
      level: 'error',
    }),
    new winston.transports.File({
      filename: './logs/warns.log',
      level: 'warn',
    }),
  ],
});

const addLogger = (req, res, next) => {
  req.logger = logger;

  req.logger.error = (error) => {
    logger.error(
      `Error at ${req.method} ${req.url} - Error: ${error.message || error} - Stack: ${error.stack} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`
    );
  };

  req.logger.warn(
    `Access to route ${req.url} - User-Agent: ${req.get('User-Agent')} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`
  );

  req.logger.http(
    `${req.method} ${req.url} - Status: ${res.statusCode} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`
  );

  req.logger.info(
    `Request to ${req.url} - Method: ${req.method} - Body: ${JSON.stringify(req.body)} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`
  );

  next();
};

export default addLogger;
