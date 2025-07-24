import routes from "@/routes";
import { NextResponse } from "next/server";
import generateToken from "@/Utilities/module";

export const GET = (req) => {
  try {
    const id = Date.now(); 
    const token = generateToken(id, "1m");

    const redirectURL = new URL(routes.shippingWithToken(token), req.url);

    return NextResponse.redirect(redirectURL);
  } catch (err) {
    console.error("❌ Error:", err.message);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
};
