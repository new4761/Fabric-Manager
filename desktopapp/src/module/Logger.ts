class Logger {
  logger: any;

  constructor() {
    const opts = {
      logDirectory: "./log", // NOTE: folder must exist and be writable...
      logFilePath:'./log/project.log',
      timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
    };
    this.logger = require("simple-node-logger").createSimpleLogger(opts);
  }

  log(type: string, message: string) {
    this.logger.log(type, message);
  }
}
export default new Logger();
