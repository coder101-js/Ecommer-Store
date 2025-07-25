import { NextResponse } from "next/server";
import generateToken from "@/Utilities/module";

export async function POST(req) {
  try {
    // ✅ ESM-safe dynamic import of Stripe
    const { default: Stripe } = await import("stripe");
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    });

    const body = await req.json();

    const token = await generateToken({
      userId: body?.userId || "anon",
      name: body?.name || "customer",
    });

    const successUrl = `https://boltform.buttnetworks.com/success?token=${token}`;
    const cancelUrl = `https://boltform.buttnetworks.com/cart`;

    if (!Array.isArray(body?.items) || body.items.length === 0) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 });
    }

    const line_items = body.items.map((item) => {
      if (!item?.price || !item?.title || !item?.quantity) {
        throw new Error("Invalid item data in cart");
      }

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
          },
          unit_amount: Math.round(item.price * 100), // price in cents
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("🔥 Stripe Checkout Error:", err);
    return NextResponse.json(
      { error: "Checkout session failed", message: err.message },
      { status: 500 }
    );
  }
}
