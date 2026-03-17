import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

/** Must match the email on your Resend account when using onboarding@resend.dev */
const TO_EMAIL = process.env.ASK_NISH_TO_EMAIL || "npithia@gmail.com";

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Server missing RESEND_API_KEY" },
      { status: 500 }
    );
  }
  const resend = new Resend(apiKey);

  try {
    const { email, question } = await req.json();
    if (!email?.trim() || !question?.trim()) {
      return NextResponse.json(
        { error: "Email and question are required" },
        { status: 400 }
      );
    }

    const fromAddress = process.env.RESEND_FROM || "Ask Nish <onboarding@resend.dev>";
    const { error } = await resend.emails.send({
      from: fromAddress,
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

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Submit error:", e);
    return NextResponse.json(
      { error: "Failed to send question" },
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
