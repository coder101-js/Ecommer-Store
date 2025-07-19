// /app/api/checkout/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { SignJWT } from "jose";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function generateToken(payload) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("5m")
    .sign(secret);
}

export async function POST(req) {
  const body = await req.json();

  // ✅ Create JWT *before* session
  const token = await generateToken({
    userId: body.userId || "anon",
    name: body.name || "customer",
  });

  const successUrl = `http://localhost:3000/success?token=${token}`;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.title },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    })),
    mode: "payment",
    success_url: successUrl, // ✅ Set the final URL here
    cancel_url: "http://localhost:3000/cart",
  });

  return NextResponse.json({ url: session.url });
}
