// /app/api/checkout/route.js
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const body = await req.json();

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
    success_url: "", // we inject it below
    cancel_url: "http://localhost:3000/cart",
  });

  // 🧠 Call your own /api/jwt route
  const jwtRes = await fetch("http://localhost:3000/api/jwt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: body.userId,
      sessionId: session.id,
      name: body.name,
    }),
  });

  const { token } = await jwtRes.json();

  const successUrl = `http://localhost:3000/success?token=${token}`;

  await stripe.checkout.sessions.update(session.id, {
    success_url: successUrl,
  });

  return NextResponse.json({ url: session.url });
}
