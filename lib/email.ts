import nodemailer from "nodemailer";

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({ to, subject, html, text }: SendEmailParams) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  // Log formatted email details in dev console
  console.log("--------------------------------------------------");
  console.log(`[EMAIL DISPATCH] To: ${to}`);
  console.log(`[EMAIL DISPATCH] Subject: ${subject}`);
  console.log("--------------------------------------------------");

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.log("[EMAIL NOTICE] SMTP credentials not set in environment variables. Email logged to console.");
    return { success: true, mocked: true };
  }

  try {
    const isGmail = smtpHost === "smtp.gmail.com" || smtpUser.endsWith("@gmail.com");
    const transporter = nodemailer.createTransport(
      isGmail
        ? {
            service: "gmail",
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
          }
        : {
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465,
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
          }
    );

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || `"SunPermit Notifications" <${smtpUser}>`,
      to,
      subject,
      html,
      text: text || "Please view this email in an HTML-compatible client.",
    });

    console.log(`[EMAIL DISPATCH SUCCESS] MessageId: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("[EMAIL DISPATCH ERROR]", error);
    return { success: false, error };
  }
}
