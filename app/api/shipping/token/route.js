import { NextResponse } from "next/server";
import generateToken from "@/Utilities/module";

export const GET = async (req) => {
  const allowedOrigin = process.env.NEXT_PUBLIC_SITE_URL; // example: https://mycoolapp.com
  const requestOrigin = req.headers.get("origin");

  // 👮‍♂️ Block if origin is not allowed
  if (requestOrigin !== allowedOrigin) {
    return NextResponse.json(
      { error: "Unauthorized: invalid origin 🚫" },
      { status: 403 }
    );
  }

  try {
    const token = await generateToken({ id: Date.now() }, "20s");
    return NextResponse.json({ token });
  } catch (err) {
    console.error("❌ Error:", err.message);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
};
