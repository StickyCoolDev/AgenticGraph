import { promises as fs } from "fs";

const getCurrentDateTime = (): string => {
  const now = new Date();
  const date = now.toLocaleDateString("en-US", { timeZone: process.env.TZ });
  const time = now.toLocaleTimeString("en-US", {
    hour12: false,
    timeZone: process.env.TZ,
  });
  return `${date} ${time}`;
};

export class BaseLogger {
  private logFilePath: string;

  constructor(filePath: string) {
    this.logFilePath = filePath;
  }

  private log(level: string, message: string): void {
    const dateTime = getCurrentDateTime();
    const logEntry = `[${level}](${dateTime}): ${message}\n`;

    fs.appendFile(this.logFilePath, logEntry).catch(() => {});
    console.log(logEntry.trim());
  }

  info(message: string): void {
    this.log("INFO", message);
  }

  warn(message: string): void {
    this.log("WARN", message);
  }

  error(message: string): void {
    this.log("ERROR", message);
  }

  debug(message: string): void {
    this.log("DEBUG", message);
  }
}

export const BaseLoggerFilePath: string = "app.logs";
export const Logger = new BaseLogger(BaseLoggerFilePath);
