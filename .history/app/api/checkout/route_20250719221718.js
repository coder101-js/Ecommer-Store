import { NextResponse } from "next/server";
import Stripe from "stripe";
import { SignJWT } from "jose";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 🔐 Inlined JWT generator
async function generateToken(payload) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("5m") 
    .sign(secret);

  return token;
}

export async function POST(req) {
  const body = await req.json();

  // 🛍️ Create Stripe Checkout session
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
    success_url: "", // placeholder
    cancel_url: "http://localhost:3000/cart",
  });

  // 🔐 Create JWT with session + user info
  const token = await generateToken({
    userId: body.userId || "anon",
    sessionId: session.id,
    name: body.name || "Customer",
  });

  const successUrl = `http://localhost:3000/success?token=${token}`;

  await stripe.checkout.sessions.update(session.id, {
    success_url: successUrl,
  });

  return NextResponse.json({ url: session.url });
}
