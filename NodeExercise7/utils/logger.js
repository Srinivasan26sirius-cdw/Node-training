const { createLogger, format, transports } = require('winston');

/* This code is creating a logger object called `errorLogger` using the `createLogger` function from
the `winston` library. The logger is configured to log messages with a level of
`process.env.LOGGER_LEVEL_ERROR` or higher (i.e. `error`, `warn`, and `info` messages will be
logged). The logger is also configured to write log messages to a file called `error.log` in the
`./logs` directory. The log messages are formatted with a timestamp, aligned, and printed in the
format `level: timestamp: message`. */
const errorLogger = createLogger({
    level: process.env.LOGGER_LEVEL_ERROR,
    transports: [
      new transports.File({
        filename: "./logs/error.log",
        format: format.combine(
          format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
          format.align(),
          format.printf(
            (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
          )
        ),
      })
    ]
});

/* This code is creating a logger object called `warningLogger` using the `createLogger` function from
the `winston` library. The logger is configured to log messages with a level of
`process.env.LOGGER_LEVEL_WARNING` or higher (i.e. `warn` and `error` messages will be logged). The
logger is also configured to write log messages to a file called `warnings.log` in the `./logs`
directory. The log messages are formatted with a timestamp, aligned, and printed in the format
`level: timestamp: message`. */
const warningLogger = createLogger({
    level: process.env.LOGGER_LEVEL_WARNING,
    transports: new transports.File({
      filename: "./logs/warnings.log",
      format: format.combine(
        format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
        format.align(),
        format.printf(
          (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
        )
      ),
    })
});

/* This code is creating a logger object called `infoLogger` using the `createLogger` function from the
`winston` library. The logger is configured to log messages with a level of
`process.env.LOGGER_LEVEL_INFO` or higher (i.e. `info`, `warn`, and `error` messages will be
logged). The logger is also configured to write log messages to a file called `info.log` in the
`./logs` directory. The log messages are formatted with a timestamp, aligned, and printed in the
format `level: timestamp: message`. */
const infoLogger = createLogger({
    level: process.env.LOGGER_LEVEL_INFO,
    transports: [
      new transports.File({
        filename: "./logs/info.log",
        format: format.combine(
          format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
          format.align(),
          format.printf(
            (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
          )
        ),
      })
    ]
 });

module.exports={errorLogger,warningLogger,infoLogger}
