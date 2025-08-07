import nodemailer from "nodemailer";

export async function sendEmail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  // --- START DEBUG LOGS ---
  console.log("--- Vercel Email Debug ---");
  console.log("Attempting to send email to:", to);
  console.log("process.env.MAILTRAP_USER:", process.env.MAILTRAP_USER);
  console.log("Does MAILTRAP_PASS exist?:", !!process.env.MAILTRAP_PASS);
  // --- END DEBUG LOGS ---

  const transport = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.MAILTRAP_USER || "api",
      pass: process.env.MAILTRAP_PASS,
    },
  });

  const info = await transport.sendMail({
    from: "noreply@app-demonstrator.site",
    to,
    subject,
    text: text.replace(/<\/?[^>]+(>|$)/g, ""), // strip tags for plain text fallback
    html: text, // use full HTML content here
  });

  console.log("Message sent: %s", info.messageId);
}
