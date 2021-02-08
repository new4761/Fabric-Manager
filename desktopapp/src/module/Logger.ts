class Logger {
  logger: any;

  constructor() {
    const opts = {
      logDirectory: "./log", // NOTE: folder must exist and be writable...
      fileNamePattern: "roll-<DATE>.log",
      dateFormat: "YYYY.MM.DD",
    };
    this.logger = require("simple-node-logger").createRollingFileLogger(opts);
  }

  log(type: string, message: string) {
    const date = new Date().toJSON();
    this.logger.log(type, message + date);

    // switch (type) {
    //   case "info":
    //     this.logger.info(message, date);
    //     break;

    //   case "warn":
    //     this.logger.warn(message, date);
    //     break;

    //   case "error":
    //     this.logger.error(message, date);
    //     break;
    // }
  }
}
export default new Logger();
