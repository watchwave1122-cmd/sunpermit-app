import { NextRequest, NextResponse } from "next/server";
import { getStripe, isStripeConfigured } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      companyName,
      email,
      streetAddress,
      aptSuite,
      city,
      state,
      zip,
      amount,
      paymentReference,
    } = body;

    const parsedAmount = typeof amount === "number" ? amount : parseFloat(amount);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return NextResponse.json(
        { error: "Please enter a valid invoice payment amount greater than $0." },
        { status: 400 }
      );
    }

    if (!companyName || !companyName.trim()) {
      return NextResponse.json(
        { error: "Company name is required." },
        { status: 400 }
      );
    }

    // Determine site URL for redirects
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
      req.nextUrl.origin ||
      "http://localhost:3000";

    // 3% merchant processing fee
    const baseCents = Math.round(parsedAmount * 100);
    const feeCents = Math.round(parsedAmount * 0.03 * 100);
    const totalCents = baseCents + feeCents;

    // If Stripe keys are not configured yet, provide local simulation so workflow can be previewed immediately
    if (!isStripeConfigured()) {
      const demoSessionId = `demo_session_${Date.now()}`;
      const params = new URLSearchParams({
        session_id: demoSessionId,
        amount: parsedAmount.toFixed(2),
        company: companyName.trim(),
        ref: paymentReference ? paymentReference.trim() : "INV-TEST",
        email: email ? email.trim() : "demo@sunpermit.com",
      });

      return NextResponse.json({
        url: `${siteUrl}/pay-invoice/success?${params.toString()}`,
        sessionId: demoSessionId,
        simulated: true,
      });
    }

    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email && email.includes("@") ? email.trim() : undefined,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `SunPermit Invoice Payment - ${companyName.trim()}`,
              description: paymentReference
                ? `Invoice Ref: ${paymentReference.trim()}`
                : "Solar Design & Engineering Permit Services",
            },
            unit_amount: baseCents,
          },
          quantity: 1,
        },
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Card Processing Fee (3%)",
              description: "Standard merchant card fee",
            },
            unit_amount: feeCents,
          },
          quantity: 1,
        },
      ],
      metadata: {
        companyName: companyName.trim(),
        email: email ? email.trim() : "N/A",
        paymentReference: paymentReference ? paymentReference.trim() : "N/A",
        streetAddress: streetAddress || "",
        aptSuite: aptSuite || "",
        city: city || "",
        state: state || "",
        zip: zip || "",
        baseAmount: parsedAmount.toFixed(2),
        totalAmount: (totalCents / 100).toFixed(2),
      },
      success_url: `${siteUrl}/pay-invoice/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/pay-invoice?canceled=true`,
    });

    return NextResponse.json({
      url: session.url,
      sessionId: session.id,
      simulated: false,
    });
  } catch (error: any) {
    console.error("Stripe Checkout Session Error:", error);
    return NextResponse.json(
      {
        error: error.message || "Failed to create Stripe Checkout session. Please try again.",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.nextUrl.searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Missing session_id parameter" },
        { status: 400 }
      );
    }

    // Check for demo or unconfigured mode
    if (!isStripeConfigured() || sessionId.startsWith("demo_")) {
      const amountParam = req.nextUrl.searchParams.get("amount");
      const companyParam = req.nextUrl.searchParams.get("company");
      const refParam = req.nextUrl.searchParams.get("ref");
      const emailParam = req.nextUrl.searchParams.get("email");

      const baseAmount = amountParam ? parseFloat(amountParam) : 250.0;
      const totalCents = Math.round(baseAmount * 1.03 * 100);

      return NextResponse.json({
        id: sessionId,
        payment_status: "paid",
        amount_total: totalCents,
        currency: "usd",
        customer_details: {
          email: emailParam || "customer@example.com",
          name: companyParam || "SunPermit Client LLC",
        },
        metadata: {
          companyName: companyParam || "SunPermit Client LLC",
          paymentReference: refParam || "INV-DEMO-001",
          email: emailParam || "billing@example.com",
          baseAmount: baseAmount.toFixed(2),
          totalAmount: (totalCents / 100).toFixed(2),
        },
        created: Math.floor(Date.now() / 1000),
        simulated: true,
      });
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      id: session.id,
      payment_status: session.payment_status,
      amount_total: session.amount_total,
      currency: session.currency,
      customer_details: session.customer_details,
      metadata: session.metadata,
      created: session.created,
      simulated: false,
    });
  } catch (error: any) {
    console.error("Retrieve Stripe Session Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to retrieve session details." },
      { status: 500 }
    );
  }
}
