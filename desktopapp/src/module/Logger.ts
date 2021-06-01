// const isDevelopment = process.env.NODE_ENV !== 'production'

import { LoggerDirectory, LoggerPath } from "@/models/EnvProject";

// const path = require('path');
class Logger {
  logger: any;

  constructor() {
    // console.log("is called")
    const opts = {
      logDirectory: LoggerDirectory, // NOTE: folder must exist and be writable...
      logFilePath:LoggerPath,
      timestampFormat:'YYYY-MM-DD HH:mm:ss.SSS'
    };
    this.logger = require("simple-node-logger").createSimpleLogger(opts);
    // console.log(opts)
  }

  log(type: string, message: string) {
    this.logger.log(type, message);
  }
}
export default new Logger();
