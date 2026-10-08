import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey || secretKey === "sk_test_placeholder_key") {
    throw new Error(
      "STRIPE_SECRET_KEY is not configured. Please add your Stripe Secret Key from https://dashboard.stripe.com/test/apikeys to your .env file."
    );
  }

  if (!stripeClient) {
    stripeClient = new Stripe(secretKey);
  }

  return stripeClient;
}

export function isStripeConfigured(): boolean {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  return Boolean(secretKey && secretKey !== "sk_test_placeholder_key" && secretKey.startsWith("sk_"));
}
