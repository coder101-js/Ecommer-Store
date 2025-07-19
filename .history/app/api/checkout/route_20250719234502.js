import { NextResponse } from "next/server";
import Stripe from "stripe";
import { SignJWT } from "jose";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ Create JWT before hitting Stripe
async function generateToken(payload) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("5m")
    .sign(secret);
}

export async function POST(req) {
  const body = await req.json();

  // Create token from user/session data
  const token = await generateToken({
    userId: body.userId || "anon",
    name: body.name || "customer",
  });

  const successUrl = `https://boltform.buttnetworks.com/success?token=${token}`; // ✅ Not empty

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    })),
    mode: "payment",
    success_url: successUrl, // ✅ token already included
    cancel_url: "https://boltform.buttnetworks.com/cart",
  });

  return NextResponse.json({ url: session.url });
}
