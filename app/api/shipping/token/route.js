import { NextResponse } from "next/server";
import generateToken from "@/Utilities/module";

export const GET = async (req) => {
  try {
    const token = await generateToken({ id: Date.now() }, "1m");
    return NextResponse.json({token})
  } catch (err) {
    console.error("❌ Error:", err.message);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
};
