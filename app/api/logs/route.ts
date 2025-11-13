import { BaseLoggerFilePath, Logger } from "@/lib/logger";
import { readFileSync } from "fs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // read file
    const LogFile: string = readFileSync(BaseLoggerFilePath, "utf8");

    // return Response
    return NextResponse.json({
      status: 200,
      log: {
        file_name: BaseLoggerFilePath,
        content: LogFile,
      },
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: error,
      code: "log/server_error",
    });
  }
}

export async function POST(request: Request) {
  request.credentials;
  const data = await request.json();

  const { log_level, log_message }: { log_level: string; log_message: string } =
    data;

  if (log_level) {
    return NextResponse.json({
      status: 400,
      message: "log_level missing in body, needed to create log",
      code: "log/missing_parameter",
    });
  }

  if (log_message) {
    return NextResponse.json({
      status: 400,
      message: "log_message missing in body, needed to create log",
      code: "log/missing_parameter",
    });
  }

  switch (log_level) {
    case "info":
      Logger.info(log_message);
      break;
    case "error":
      Logger.error(log_message);
      break;
    case "warn":
      Logger.warn(log_message);
      break;

    default:
      return NextResponse.json({
        status: 404,
        message: "Unknow log log_level",
        code: "log/unknow_log_level",
      });
  }

  return NextResponse.json({
    status: 200,
    message: "Log created sucsessfuly.",
    code: "log/created",
  });
}
