import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    mailer: "gmail",
    hasGmail: !!(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD),
  });
}
