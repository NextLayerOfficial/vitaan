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
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  const info = await transport.sendMail({
    from: `"Your App" <${process.env.MAILTRAP_USER}>`, // sender address
    to,
    subject,
    text: text.replace(/<\/?[^>]+(>|$)/g, ""), // strip tags for plain text fallback
    html: text, // use full HTML content here
  });

  console.log("Message sent: %s", info.messageId);
}
