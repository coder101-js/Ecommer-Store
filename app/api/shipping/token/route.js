import routes from "@/routes"; // make sure alias is working
import { NextResponse } from "next/server";
import generateToken from "@/Utilities/module";

export const GET = async (req) => {
  try {
    const id = Date.now();
    const token = await generateToken({ id: Date.now() }, "1m");

    const origin = new URL(req.url).origin; 
    const redirectURL = new URL(routes.shippingWithToken(token), origin);

    return NextResponse.redirect(redirectURL);
  } catch (err) {
    console.error("❌ Error:", err.message);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
};
