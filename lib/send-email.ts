// import nodemailer from "nodemailer";

// export async function sendEmail({
//   to,
//   subject,
//   text,
//   html,
// }: {
//   to: string;
//   subject: string;
//   text: string;
//   html?: string;
// }) {
//   const transport = nodemailer.createTransport({
//     // host: "live.smtp.mailtrap.io",
//     host: process.env.MAILTRAP_HOST,
//     port: 587,
//     secure: false,
//     requireTLS: true,
//     auth: {
//       user: process.env.MAILTRAP_USER,
//       pass: process.env.MAILTRAP_PASS,
//     },
//   });

//   const info = await transport.sendMail({
//     from: "noreply@app-demonstrator.site",
//     to,
//     subject,
//     text: text.replace(/<\/?[^>]+(>|$)/g, ""), // strip tags for plain text fallback
//     html,
//   });

//   // console.log("Message sent: %s", info.messageId);
// }
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
  try {
    const transport = nodemailer.createTransport({
      // for debugging, you can temporarily hardcode this to confirm:
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

    console.log("📧 Creating transport with:", {
      host: process.env.MAILTRAP_HOST,
      hasUser: !!process.env.MAILTRAP_USER,
      hasPass: !!process.env.MAILTRAP_PASS,
    });

    const info = await transport.sendMail({
      from: "noreply@app-demonstrator.site",
      to,
      subject,
      text: text.replace(/<\/?[^>]+(>|$)/g, ""), // strip tags for plain text fallback
      html,
    });

    console.log("✅ Email sent", { to, messageId: info.messageId });
    return info;
  } catch (err: any) {
    console.error("❌ Email sending failed", {
      to,
      error: err?.message || String(err),
      stack: err?.stack,
    });
    throw err;
  }
}
