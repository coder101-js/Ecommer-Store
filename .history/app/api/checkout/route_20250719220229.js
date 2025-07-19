import { NextResponse } from "next/server";
import Stripe from "stripe";
import { SignJWT } from "jose";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 🔐 JWT secret (32-byte hex string, stored in your .env)
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

// 🔧 helper to generate JWT
async function generateToken(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("5m")
    .sign(JWT_SECRET);
}

export async function POST(req) {
  const body = await req.json();

  // 🛒 create Stripe session
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
    success_url: "", // we set this below
    cancel_url: "http://localhost:3000/cart",
  });

  // 🧾 create JWT with session data
  const payload = {
    sessionId: session.id,
    email: body.email || "unknown", // optional
    name: body.name || "customer",
  };

  const token = await generateToken(payload);

  // ✅ inject JWT in the success URL
  const successUrl = `http://localhost:3000/success?token=${token}`;

  // Update the session with the final redirect
  await stripe.checkout.sessions.update(session.id, {
    success_url: successUrl,
  });

  return NextResponse.json({ url: session.url });
}
