import winston from "winston";

const { LOGGER_FILE, LOGGER_ERROR_FILE, LOGGER_LEVEL } = process.env;

const logger = winston.createLogger({
  level: LOGGER_LEVEL,
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: LOGGER_ERROR_FILE,
      level: "error",
    }),
    new winston.transports.File({ filename: LOGGER_FILE }),
  ],
});

const addDataToMessage = (data: object) => {
  return data ? `:\n ${JSON.stringify(data)}` : "";
};

const logError = (message: string, data: object) => {
  logger.error(`${message}` + addDataToMessage(data));
};

const logInfo = (message: string, data: object) => {
  logger.info(`${message}` + addDataToMessage(data));
};

const logWarn = (message: string, data: object) => {
  logger.warn(`${message}` + addDataToMessage(data));
};

export { logError, logInfo, logWarn };
