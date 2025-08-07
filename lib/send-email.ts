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
  const transport = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: process.env.MAILTRAP_USER || "api",
      pass: process.env.MAILTRAP_PASS,
    },
  });

  const info = await transport.sendMail({
    from: "Support Team <no-reply@app-demonstration.com>", // sender address
    to,
    subject,
    text: text.replace(/<\/?[^>]+(>|$)/g, ""), // strip tags for plain text fallback
    html: text, // use full HTML content here
  });

  console.log("Message sent: %s", info.messageId);
}
