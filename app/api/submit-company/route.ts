import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      companyName,
      contactName,
      email,
      phone,
      licenseNumber,
      licenseState,
      // Step 2 fields
      monthlyVolume,
      projectTypes,
      serviceArea,
      // Step 3 fields
      defaultRoofType,
      defaultMountType,
      defaultModuleType,
      defaultInverterType,
      notes,
    } = body;

    if (!companyName || !email) {
      return NextResponse.json(
        { success: false, message: "Company name and email are required." },
        { status: 400 }
      );
    }

    const companyId = `SPC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const submittedAt = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });

    // ─── Admin notification email ───────────────────────────────────────────
    const adminHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body { font-family: Arial, sans-serif; background: #0a0f1e; color: #e2e8f0; margin: 0; padding: 0; }
            .container { max-width: 640px; margin: 32px auto; background: #131929; border-radius: 12px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #f59e0b, #f97316); padding: 28px 32px; }
            .header h1 { margin: 0; color: #0a0f1e; font-size: 22px; font-weight: 700; }
            .header p { margin: 4px 0 0; color: #451a03; font-size: 13px; }
            .badge { display: inline-block; background: #0a0f1e; color: #f59e0b; border-radius: 20px; padding: 4px 14px; font-size: 13px; font-weight: 700; margin-top: 12px; letter-spacing: 0.5px; }
            .body { padding: 28px 32px; }
            .section-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #f59e0b; margin: 24px 0 10px; }
            table { width: 100%; border-collapse: collapse; }
            td { padding: 10px 0; border-bottom: 1px solid #1e2d45; font-size: 14px; vertical-align: top; }
            td:first-child { color: #94a3b8; width: 45%; }
            td:last-child { color: #f1f5f9; font-weight: 500; }
            .footer { padding: 20px 32px; background: #0d1526; text-align: center; font-size: 12px; color: #475569; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>☀️ New Company Registration</h1>
              <p>A new company has submitted their details via SunPermit</p>
              <div class="badge">${companyId}</div>
            </div>
            <div class="body">
              <div class="section-title">Company Profile</div>
              <table>
                <tr><td>Company Name</td><td>${companyName || "—"}</td></tr>
                <tr><td>Contact Name</td><td>${contactName || "—"}</td></tr>
                <tr><td>Email</td><td>${email}</td></tr>
                <tr><td>Phone</td><td>${phone || "—"}</td></tr>
                <tr><td>License Number</td><td>${licenseNumber || "—"}</td></tr>
                <tr><td>License State</td><td>${licenseState || "—"}</td></tr>
              </table>

              <div class="section-title">Volume &amp; Scope</div>
              <table>
                <tr><td>Monthly Volume</td><td>${monthlyVolume || "—"}</td></tr>
                <tr><td>Project Types</td><td>${Array.isArray(projectTypes) ? projectTypes.join(", ") : (projectTypes || "—")}</td></tr>
                <tr><td>Service Area</td><td>${serviceArea || "—"}</td></tr>
              </table>

              <div class="section-title">CAD Defaults</div>
              <table>
                <tr><td>Default Roof Type</td><td>${defaultRoofType || "—"}</td></tr>
                <tr><td>Default Mount Type</td><td>${defaultMountType || "—"}</td></tr>
                <tr><td>Default Module Type</td><td>${defaultModuleType || "—"}</td></tr>
                <tr><td>Default Inverter Type</td><td>${defaultInverterType || "—"}</td></tr>
                <tr><td>Notes</td><td>${notes || "—"}</td></tr>
              </table>

              <div class="section-title">Submission Metadata</div>
              <table>
                <tr><td>Company ID</td><td>${companyId}</td></tr>
                <tr><td>Submitted At</td><td>${submittedAt} ET</td></tr>
              </table>
            </div>
            <div class="footer">SunPermit &bull; Automated Notification &bull; Do not reply to this email</div>
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
            .container { max-width: 600px; margin: 32px auto; background: #131929; border-radius: 12px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #f59e0b, #f97316); padding: 28px 32px; }
            .header h1 { margin: 0; color: #0a0f1e; font-size: 22px; font-weight: 700; }
            .header p { margin: 6px 0 0; color: #451a03; font-size: 14px; }
            .body { padding: 28px 32px; }
            p { font-size: 15px; line-height: 1.7; color: #cbd5e1; }
            .id-box { background: #0d1526; border: 1px solid #1e2d45; border-radius: 8px; padding: 18px 24px; margin: 24px 0; text-align: center; }
            .id-box .label { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; }
            .id-box .value { font-size: 28px; font-weight: 700; color: #f59e0b; margin-top: 6px; letter-spacing: 2px; }
            .cta { display: block; background: linear-gradient(135deg, #f59e0b, #f97316); color: #0a0f1e; text-decoration: none; font-weight: 700; text-align: center; padding: 14px 32px; border-radius: 8px; font-size: 15px; margin: 24px 0; }
            .footer { padding: 20px 32px; background: #0d1526; text-align: center; font-size: 12px; color: #475569; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>☀️ Welcome to SunPermit!</h1>
              <p>Your company profile has been received</p>
            </div>
            <div class="body">
              <p>Hi ${contactName || companyName},</p>
              <p>Thank you for registering <strong>${companyName}</strong> with SunPermit. Our team will review your profile and reach out within 1 business day to complete your onboarding.</p>
              <div class="id-box">
                <div class="label">Your Company ID</div>
                <div class="value">${companyId}</div>
              </div>
              <p>Keep this ID handy — you'll use it when placing permit orders and communicating with our team.</p>
              <a href="https://sunpermit.com/request-permit" class="cta">Order Your First Permit Planset →</a>
              <p style="font-size:13px;color:#64748b;">If you have any questions, reply to this email or contact us at <a href="mailto:support@sunpermit.com" style="color:#f59e0b;">support@sunpermit.com</a>.</p>
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
        subject: `[SunPermit] New Company Registration: ${companyName} (${companyId})`,
        html: adminHtml,
      }),
      sendEmail({
        to: email,
        subject: `Welcome to SunPermit — Your Company ID: ${companyId}`,
        html: clientHtml,
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: "Company details submitted successfully.",
      companyId,
      receivedAt: new Date().toISOString(),
      company: {
        companyName,
        contactName,
        email,
        phone,
        licenseNumber,
        licenseState,
      },
    });
  } catch (error) {
    console.error("API error submitting company:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
