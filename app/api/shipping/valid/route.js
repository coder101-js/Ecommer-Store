import { NextResponse } from "next/server";
import { verifyToken } from "@/Utilities/module";

export const GET = (req) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const token = searchParams.get("token");
    console.log(token)
    if (!token) {
      return NextResponse.json({ valid: false ,token});
    }
    const isValid = verifyToken(token);
    if (!isValid) {
      return NextResponse.json({ valid: false,token });
    }
    return NextResponse.json({ valid: true });
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
};
