import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      // Stage 1
      customerName,
      companyName,
      email,
      phone,
      streetAddress,
      city,
      state,
      zipCode,
      ahjName,
      // Stage 2
      systemSizeKw,
      moduleCount,
      moduleMake,
      moduleModel,
      inverterMake,
      inverterModel,
      inverterCount,
      mountingSystem,
      roofType,
      // Stage 3
      hasBattery,
      batteryMake,
      batteryModel,
      batteryCount,
      mainBreakerAmps,
      mspLocation,
      mspBusRating,
      // Stage 4
      needElectricalPe,
      needStructuralPe,
      deliverySpeed,
      totalPrice,
    } = body;

    const trackingId = `SP-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const submittedAt = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });

    // ─── Admin notification email ───────────────────────────────────────────
    const adminHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body { font-family: Arial, sans-serif; background: #0a0f1e; color: #e2e8f0; margin: 0; padding: 0; }
            .container { max-width: 680px; margin: 32px auto; background: #131929; border-radius: 12px; overflow: hidden; }
            .header { background: linear-gradient(135deg, #f59e0b, #f97316); padding: 28px 32px; }
            .header h1 { margin: 0; color: #0a0f1e; font-size: 22px; font-weight: 700; }
            .header p { margin: 4px 0 0; color: #451a03; font-size: 13px; }
            .meta { display: flex; gap: 16px; margin-top: 14px; flex-wrap: wrap; }
            .badge { display: inline-block; background: #0a0f1e; color: #f59e0b; border-radius: 20px; padding: 5px 14px; font-size: 13px; font-weight: 700; letter-spacing: 0.5px; }
            .badge-blue { background: #0a0f1e; color: #60a5fa; }
            .badge-green { background: #0a0f1e; color: #34d399; }
            .body { padding: 28px 32px; }
            .section-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: #f59e0b; margin: 24px 0 10px; padding-bottom: 6px; border-bottom: 1px solid #1e2d45; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 8px; }
            td { padding: 9px 0; border-bottom: 1px solid #1a2540; font-size: 14px; vertical-align: top; }
            td:first-child { color: #94a3b8; width: 42%; }
            td:last-child { color: #f1f5f9; font-weight: 500; }
            .total-row td { border-top: 2px solid #f59e0b !important; border-bottom: none; padding-top: 14px; }
            .total-row td:last-child { color: #f59e0b; font-size: 20px; font-weight: 700; }
            .footer { padding: 20px 32px; background: #0d1526; text-align: center; font-size: 12px; color: #475569; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>⚡ New Permit Planset Order</h1>
              <p>A new permit planset request has been submitted via SunPermit</p>
              <div class="meta">
                <div class="badge">${trackingId}</div>
                <div class="badge badge-blue">${deliverySpeed === "24hr" ? "⚡ Express 24hr" : "Standard 5–7 Days"}</div>
                ${needElectricalPe ? '<div class="badge badge-green">Electrical PE</div>' : ""}
                ${needStructuralPe ? '<div class="badge badge-green">Structural PE</div>' : ""}
              </div>
            </div>
            <div class="body">

              <div class="section-title">Customer &amp; Site Information</div>
              <table>
                <tr><td>Customer Name</td><td>${customerName || "—"}</td></tr>
                <tr><td>Company</td><td>${companyName || "—"}</td></tr>
                <tr><td>Email</td><td>${email || "—"}</td></tr>
                <tr><td>Phone</td><td>${phone || "—"}</td></tr>
                <tr><td>Site Address</td><td>${streetAddress || "—"}, ${city || "—"}, ${state || "—"} ${zipCode || ""}</td></tr>
                <tr><td>AHJ (Authority Having Jurisdiction)</td><td>${ahjName || "—"}</td></tr>
              </table>

              <div class="section-title">Solar Equipment</div>
              <table>
                <tr><td>System Size</td><td>${systemSizeKw || "—"} kW</td></tr>
                <tr><td>Module Count</td><td>${moduleCount || "—"}</td></tr>
                <tr><td>Module</td><td>${moduleMake || "—"} ${moduleModel || ""}</td></tr>
                <tr><td>Inverter</td><td>${inverterMake || "—"} ${inverterModel || ""}</td></tr>
                <tr><td>Inverter Count</td><td>${inverterCount || "—"}</td></tr>
                <tr><td>Mounting System</td><td>${mountingSystem || "—"}</td></tr>
                <tr><td>Roof Type</td><td>${roofType || "—"}</td></tr>
              </table>

              <div class="section-title">Electrical &amp; Battery</div>
              <table>
                <tr><td>Battery Storage</td><td>${hasBattery ? "Yes" : "No"}</td></tr>
                ${hasBattery ? `<tr><td>Battery</td><td>${batteryMake || "—"} ${batteryModel || ""} × ${batteryCount || "—"}</td></tr>` : ""}
                <tr><td>Main Breaker</td><td>${mainBreakerAmps || "—"} A</td></tr>
                <tr><td>MSP Location</td><td>${mspLocation || "—"}</td></tr>
                <tr><td>MSP Bus Rating</td><td>${mspBusRating || "—"} A</td></tr>
              </table>

              <div class="section-title">Order Options &amp; Pricing</div>
              <table>
                <tr><td>Base Planset</td><td>$149.00</td></tr>
                ${needElectricalPe ? "<tr><td>Electrical PE Stamp</td><td>+$99.00</td></tr>" : ""}
                ${needStructuralPe ? "<tr><td>Structural PE Stamp</td><td>+$100.00</td></tr>" : ""}
                ${hasBattery ? "<tr><td>Battery Storage Addon</td><td>+$99.00</td></tr>" : ""}
                ${deliverySpeed === "24hr" ? "<tr><td>Express 24hr Delivery</td><td>+$50.00</td></tr>" : ""}
                <tr class="total-row"><td>TOTAL</td><td>$${Number(totalPrice || 0).toFixed(2)}</td></tr>
              </table>

              <div class="section-title">Submission Metadata</div>
              <table>
                <tr><td>Tracking ID</td><td>${trackingId}</td></tr>
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
            .id-box { background: #0d1526; border: 1px solid #f59e0b33; border-radius: 10px; padding: 20px 24px; margin: 24px 0; text-align: center; }
            .id-box .label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px; color: #64748b; }
            .id-box .value { font-size: 30px; font-weight: 700; color: #f59e0b; margin-top: 8px; letter-spacing: 3px; }
            .steps { margin: 24px 0; }
            .step { display: flex; gap: 14px; margin-bottom: 14px; }
            .step-num { background: linear-gradient(135deg, #f59e0b, #f97316); color: #0a0f1e; font-weight: 700; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 13px; }
            .step-text { font-size: 14px; color: #94a3b8; padding-top: 4px; }
            .cta { display: block; background: linear-gradient(135deg, #f59e0b, #f97316); color: #0a0f1e; text-decoration: none; font-weight: 700; text-align: center; padding: 14px 32px; border-radius: 8px; font-size: 15px; margin: 24px 0; }
            .summary { background: #0d1526; border-radius: 8px; padding: 16px 20px; margin: 20px 0; }
            .summary-row { display: flex; justify-content: space-between; font-size: 14px; padding: 6px 0; border-bottom: 1px solid #1e2d45; }
            .summary-row:last-child { border-bottom: none; font-weight: 700; color: #f59e0b; }
            .footer { padding: 20px 32px; background: #0d1526; text-align: center; font-size: 12px; color: #475569; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>☀️ Order Confirmed!</h1>
              <p>Your permit planset request has been received</p>
            </div>
            <div class="body">
              <p>Hi ${customerName || "there"},</p>
              <p>Thank you for placing your order with <strong>SunPermit</strong>. Our engineers have received your request and will begin processing immediately.</p>

              <div class="id-box">
                <div class="label">Your Tracking ID</div>
                <div class="value">${trackingId}</div>
              </div>

              <div class="summary">
                <div class="summary-row"><span>Site Address</span><span>${streetAddress || "—"}, ${city || "—"}, ${state || ""}</span></div>
                <div class="summary-row"><span>System Size</span><span>${systemSizeKw || "—"} kW</span></div>
                <div class="summary-row"><span>Delivery</span><span>${deliverySpeed === "24hr" ? "Express 24 Hours" : "Standard 5–7 Business Days"}</span></div>
                <div class="summary-row"><span>Total Charged</span><span>$${Number(totalPrice || 0).toFixed(2)}</span></div>
              </div>

              <div class="steps">
                <div class="step">
                  <div class="step-num">1</div>
                  <div class="step-text">Engineering review begins within 1 hour of submission</div>
                </div>
                <div class="step">
                  <div class="step-num">2</div>
                  <div class="step-text">You'll receive an email once your planset is ready to download</div>
                </div>
                <div class="step">
                  <div class="step-num">3</div>
                  <div class="step-text">Track your order anytime using your Tracking ID above</div>
                </div>
              </div>

              <a href="https://sunpermit.com/track-permit?id=${trackingId}" class="cta">Track My Order →</a>

              <p style="font-size:13px;color:#64748b;">Questions? Reply to this email or contact <a href="mailto:support@sunpermit.com" style="color:#f59e0b;">support@sunpermit.com</a></p>
            </div>
            <div class="footer">SunPermit &bull; Fast Solar Permit Plansets &bull; 50 States &bull; 99.8% AHJ Pass Rate</div>
          </div>
        </body>
      </html>
    `;

    // All admin recipients receive every permit planset order
    const adminRecipients = [
      "support@sunpermit.odoo.com",
      "shahzaibshahid18@gmail.com",
      "rana@sunpermit.com",
      "fatima@techsaker.com",
    ];

    const emailTargets = [
      sendEmail({
        to: adminRecipients.join(", "),
        subject: `[SunPermit] New Permit Order: ${trackingId} — ${customerName || companyName || "Unknown"} (${systemSizeKw || "?"}kW, ${state || "?"})`,
        html: adminHtml,
      }),
    ];

    if (email) {
      emailTargets.push(
        sendEmail({
          to: email,
          subject: `SunPermit Order Confirmed — Tracking ID: ${trackingId}`,
          html: clientHtml,
        })
      );
    }

    await Promise.all(emailTargets);

    return NextResponse.json({
      success: true,
      message: "Permit planset request received.",
      trackingId,
      estimatedDelivery: deliverySpeed === "24hr" ? "24 Hours Guaranteed" : "5–7 Business Days",
      orderSummary: {
        customerName,
        address: `${streetAddress}, ${city}, ${state}`,
        ahjName,
        systemSizeKw,
        totalPrice,
      },
    });
  } catch (error) {
    console.error("API error requesting permit:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
