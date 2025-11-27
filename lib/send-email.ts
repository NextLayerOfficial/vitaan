import nodemailer from "nodemailer";

export async function sendEmail({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}) {
  const transport = nodemailer.createTransport({
    // host: "live.smtp.mailtrap.io",
    host: process.env.MAILTRAP_HOST,
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  const info = await transport.sendMail({
    from: "noreply@app-demonstrator.site",
    to,
    subject,
    text: text.replace(/<\/?[^>]+(>|$)/g, ""), // strip tags for plain text fallback
    html,
  });

  // console.log("Message sent: %s", info.messageId);
}
