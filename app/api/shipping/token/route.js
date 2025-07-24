import routes from "@/routes"; // make sure alias is working
import { NextResponse } from "next/server";
import generateToken from "@/Utilities/module";

export const GET = (req) => {
  try {
    const id = Date.now(); // or get user/cart/session ID
    const token = generateToken(id, "1m");

    const origin = new URL(req.url).origin; // Get base domain (e.g., https://yoursite.com)
    const redirectURL = new URL(routes.shippingWithToken(token), origin);

    return NextResponse.redirect(redirectURL);
  } catch (err) {
    console.error("❌ Error:", err.message);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
};
