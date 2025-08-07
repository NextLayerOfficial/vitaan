import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("--- Vercel ISOLATED Test ---");
  console.log("User:", process.env.MAILTRAP_USER);
  console.log("Pass Exists?:", !!process.env.MAILTRAP_PASS);

  const transport = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  try {
    await transport.sendMail({
      from: "Vercel Test <noreply@app-demonstrator.site>",
      to: "test-recipient@example.com",
      subject: "Isolated Vercel Mailtrap Test",
      text: "Testing Vercel environment variables.",
    });
    return NextResponse.json({ message: "Success!" }, { status: 200 });
  } catch (error) {
    console.error("Vercel Test Failed:", error);
    return NextResponse.json({ message: "Failed", error }, { status: 500 });
  }
}
