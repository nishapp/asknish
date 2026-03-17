import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const TO_EMAIL = process.env.ASK_NISH_TO_EMAIL || "npithia@gmail.com";

export async function POST(req: NextRequest) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    return NextResponse.json(
      { error: "Server missing GMAIL_USER or GMAIL_APP_PASSWORD" },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: { user, pass },
  });

  try {
    const { email, question } = await req.json();
    if (!email?.trim() || !question?.trim()) {
      return NextResponse.json(
        { error: "Email and question are required" },
        { status: 400 }
      );
    }

    await transporter.sendMail({
      from: `Ask Nish <${user}>`,
      to: TO_EMAIL,
      replyTo: email.trim(),
      subject: `Ask Nish: Question from ${email.trim()}`,
      text: `From: ${email.trim()}\n\nQuestion:\n${question.trim()}`,
      html: `
        <p><strong>From:</strong> ${escapeHtml(email.trim())}</p>
        <p><strong>Question:</strong></p>
        <p>${escapeHtml(question.trim()).replace(/\n/g, "<br>")}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Send error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to send" },
      { status: 500 }
    );
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
