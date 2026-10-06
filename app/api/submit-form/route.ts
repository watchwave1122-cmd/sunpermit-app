import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { formType, senderEmail, subject, data } = body;

    const submittedAt = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
    const submissionId = `SUB-${Date.now()}`;

    // Table rows generator for all form fields
    const dataRows = Object.entries(data || {})
      .map(([key, value]) => {
        const label = key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase());
        const displayVal = typeof value === "object" ? JSON.stringify(value) : String(value || "—");
        return `
          <tr>
            <td style="padding: 9px 0; border-bottom: 1px solid #1a2540; font-size: 14px; color: #94a3b8; width: 40%; vertical-align: top;">${label}</td>
            <td style="padding: 9px 0; border-bottom: 1px solid #1a2540; font-size: 14px; color: #f1f5f9; font-weight: 500; vertical-align: top; white-space: pre-wrap;">${displayVal}</td>
          </tr>
        `;
      })
      .join("");

    const adminHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
        </head>
        <body style="font-family: Arial, sans-serif; background: #0a0f1e; color: #e2e8f0; margin: 0; padding: 24px;">
          <div style="max-width: 640px; margin: 0 auto; background: #131929; border-radius: 12px; overflow: hidden; border: 1px solid #1e2d45;">
            <div style="background: linear-gradient(135deg, #f59e0b, #f97316); padding: 24px 30px;">
              <h1 style="margin: 0; color: #0a0f1e; font-size: 22px; font-weight: 800;">SunPermit Notification</h1>
              <p style="margin: 4px 0 0; color: #451a03; font-size: 14px; font-weight: 600;">New submission from: ${formType || "Website Form"}</p>
            </div>
            <div style="padding: 26px 30px;">
              <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: #f59e0b; margin-bottom: 12px;">Submission Details</div>
              <table style="width: 100%; border-collapse: collapse;">
                ${dataRows}
                <tr>
                  <td style="padding: 9px 0; border-bottom: 1px solid #1a2540; font-size: 14px; color: #94a3b8; width: 40%;">Submission ID</td>
                  <td style="padding: 9px 0; border-bottom: 1px solid #1a2540; font-size: 14px; color: #f1f5f9; font-weight: 500;">${submissionId}</td>
                </tr>
                <tr>
                  <td style="padding: 9px 0; border-bottom: 1px solid #1a2540; font-size: 14px; color: #94a3b8; width: 40%;">Timestamp</td>
                  <td style="padding: 9px 0; border-bottom: 1px solid #1a2540; font-size: 14px; color: #f1f5f9; font-weight: 500;">${submittedAt} ET</td>
                </tr>
              </table>
            </div>
            <div style="padding: 16px 30px; background: #0d1526; text-align: center; font-size: 12px; color: #64748b;">
              SunPermit Automated Submission System
            </div>
          </div>
        </body>
      </html>
    `;

    const adminRecipients = [
      "fatima@techsaker.com",
      "shahzaibshahid18@gmail.com",
      "rana@sunpermit.com",
      "support@sunpermit.odoo.com",
    ];

    const emailPromises = [
      sendEmail({
        to: adminRecipients.join(", "),
        subject: subject || `[SunPermit] New Submission: ${formType || "Website Form"} (${submissionId})`,
        html: adminHtml,
      }),
    ];

    if (senderEmail && senderEmail.includes("@")) {
      const clientHtml = `
        <!DOCTYPE html>
        <html>
          <body style="font-family: Arial, sans-serif; background: #fafafa; color: #1e293b; margin: 0; padding: 24px;">
            <div style="max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden;">
              <div style="background: linear-gradient(135deg, #f59e0b, #ea580c); padding: 24px 30px; color: white;">
                <h1 style="margin: 0; font-size: 20px;">We Received Your Submission!</h1>
                <p style="margin: 4px 0 0; opacity: 0.9; font-size: 13px;">SunPermit &bull; Reference ID: ${submissionId}</p>
              </div>
              <div style="padding: 24px 30px;">
                <p>Hello,</p>
                <p>Thank you for submitting your details for <strong>${formType || "SunPermit Services"}</strong>. Our team has received your information and is reviewing it.</p>
                <p>A specialist will be in touch with you shortly.</p>
                <p style="margin-top: 24px; font-size: 13px; color: #64748b;">Need immediate support? Call us at (551) 291-2786 or reply directly to this email.</p>
              </div>
            </div>
          </body>
        </html>
      `;

      emailPromises.push(
        sendEmail({
          to: senderEmail,
          subject: `We Received Your Submission — SunPermit (${submissionId})`,
          html: clientHtml,
        })
      );
    }

    await Promise.all(emailPromises);

    return NextResponse.json({
      success: true,
      submissionId,
      message: "Submission received and emails dispatched successfully.",
    });
  } catch (error) {
    console.error("API submission dispatch error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
