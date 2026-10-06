import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, company, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: "Name and email are required." },
        { status: 400 }
      );
    }

    const submittedAt = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
    const leadId = `LEAD-${Date.now()}`;

    // ─── Admin notification email ───────────────────────────────────────────
    const adminHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body { font-family: Arial, sans-serif; background: #0a0f1e; color: #e2e8f0; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 32px auto; background: #131929; border-radius: 12px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #f59e0b, #f97316); padding: 28px 32px; }
            .header h1 { margin: 0; color: #0a0f1e; font-size: 22px; font-weight: 700; }
            .header p { margin: 4px 0 0; color: #451a03; font-size: 13px; }
            .badge { display: inline-block; background: #0a0f1e; color: #f59e0b; border-radius: 20px; padding: 5px 14px; font-size: 13px; font-weight: 700; margin-top: 12px; letter-spacing: 0.5px; }
            .body { padding: 28px 32px; }
            .section-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: #f59e0b; margin: 20px 0 10px; padding-bottom: 6px; border-bottom: 1px solid #1e2d45; }
            table { width: 100%; border-collapse: collapse; }
            td { padding: 10px 0; border-bottom: 1px solid #1a2540; font-size: 14px; vertical-align: top; }
            td:first-child { color: #94a3b8; width: 40%; }
            td:last-child { color: #f1f5f9; font-weight: 500; }
            .message-box { background: #0d1526; border: 1px solid #1e2d45; border-radius: 8px; padding: 14px 16px; font-size: 14px; color: #cbd5e1; line-height: 1.6; margin-top: 8px; }
            .footer { padding: 20px 32px; background: #0d1526; text-align: center; font-size: 12px; color: #475569; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🌟 New Lead Received!</h1>
              <p>Someone has submitted an inquiry via SunPermit</p>
              <div class="badge">${leadId}</div>
            </div>
            <div class="body">
              <div class="section-title">Contact Details</div>
              <table>
                <tr><td>Full Name</td><td>${name}</td></tr>
                <tr><td>Email</td><td>${email}</td></tr>
                <tr><td>Phone</td><td>${phone || "—"}</td></tr>
                <tr><td>Company</td><td>${company || "—"}</td></tr>
              </table>

              <div class="section-title">Message</div>
              <div class="message-box">${message || "No message provided."}</div>

              <div class="section-title">Submission Metadata</div>
              <table>
                <tr><td>Lead ID</td><td>${leadId}</td></tr>
                <tr><td>Submitted At</td><td>${submittedAt} ET</td></tr>
              </table>
            </div>
            <div class="footer">SunPermit &bull; Automated Lead Notification &bull; Do not reply to this email</div>
          </div>
        </body>
      </html>
    `;

    // ─── Client confirmation email ──────────────────────────────────────────
    const clientHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body { font-family: Arial, sans-serif; background: #0a0f1e; color: #e2e8f0; margin: 0; padding: 0; }
            .container { max-width: 580px; margin: 32px auto; background: #131929; border-radius: 12px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #f59e0b, #f97316); padding: 28px 32px; }
            .header h1 { margin: 0; color: #0a0f1e; font-size: 22px; font-weight: 700; }
            .header p { margin: 6px 0 0; color: #451a03; font-size: 14px; }
            .body { padding: 28px 32px; }
            p { font-size: 15px; line-height: 1.7; color: #cbd5e1; }
            .cta { display: block; background: linear-gradient(135deg, #f59e0b, #f97316); color: #0a0f1e; text-decoration: none; font-weight: 700; text-align: center; padding: 14px 32px; border-radius: 8px; font-size: 15px; margin: 24px 0; }
            .footer { padding: 20px 32px; background: #0d1526; text-align: center; font-size: 12px; color: #475569; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>☀️ Thanks for reaching out!</h1>
              <p>We received your inquiry</p>
            </div>
            <div class="body">
              <p>Hi ${name},</p>
              <p>Thank you for contacting <strong>SunPermit</strong>. Our team has received your inquiry and will get back to you within <strong>1 business day</strong>.</p>
              <p>In the meantime, you can place a permit order directly — residential plansets start at just <strong>\$149</strong> with a 24-hour turnaround option.</p>
              <a href="https://sunpermit.com/request-permit" class="cta">Order a Permit Planset →</a>
              <p style="font-size:13px;color:#64748b;">Questions? Contact us at <a href="mailto:support@sunpermit.com" style="color:#f59e0b;">support@sunpermit.com</a></p>
            </div>
            <div class="footer">SunPermit &bull; Fast Solar Permit Plansets &bull; 50 States</div>
          </div>
        </body>
      </html>
    `;

    const adminRecipients = [
      "shahzaibshahid18@gmail.com",
      "rana@sunpermit.com",
      "fatima@techsaker.com",
    ];

    await Promise.all([
      sendEmail({
        to: adminRecipients.join(", "),
        subject: `[SunPermit Lead] ${name}${company ? " — " + company : ""} | ${email}`,
        html: adminHtml,
      }),
      sendEmail({
        to: email,
        subject: "We received your inquiry — SunPermit",
        html: clientHtml,
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: "Your inquiry has been received. We'll be in touch shortly!",
      leadId,
    });
  } catch (error) {
    console.error("API error submitting lead:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
