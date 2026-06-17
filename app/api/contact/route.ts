import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Until ultravi0let.com is verified in Resend, send from onboarding@resend.dev.
// Once verified, set CONTACT_FROM_EMAIL=Ultravi0let <hello@ultravi0let.com>.
const FROM = process.env.CONTACT_FROM_EMAIL ?? "Ultravi0let <onboarding@resend.dev>";
const TO = process.env.CONTACT_TO_EMAIL ?? "hello@ultravi0let.com";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(req: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Email service not configured" },
      { status: 503 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const company = String(body.company ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required" },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email) || email.length > 320) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  if (name.length > 200 || company.length > 200 || message.length > 5000) {
    return NextResponse.json({ error: "Field too long" }, { status: 400 });
  }

  const subject = `New inquiry from ${name}${company ? ` · ${company}` : ""}`;
  const text = [
    message,
    "",
    "—",
    `From: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject,
      text,
    });
    if (error) {
      console.error("[contact] Resend rejected send:", error);
      return NextResponse.json(
        { error: `Resend: ${error.message ?? error.name ?? "rejected"}` },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Server error: ${message}` },
      { status: 500 }
    );
  }
}
