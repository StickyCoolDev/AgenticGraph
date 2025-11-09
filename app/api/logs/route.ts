import { Logger } from "@/lib/logger";
import { readFileSync } from "fs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // read file
    const LogFile: string = readFileSync("app.logs", "utf8");

    // return Response
    return NextResponse.json({
      status: 200,
      log: {
        file_name: "app.logs",
        content: LogFile,
      },
    });
  } catch (error) {
    return NextResponse.json({
      status: 200,
      message: error,
    });
  }
}
``;
export async function POST(request: Request) {
  const data = await request.json();

  const { log_level, log_message }: { log_level: string; log_message: string } =
    data;

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
      break;
  }

  return NextResponse.json({status : 200, message : "logged sucsessful"})
}
