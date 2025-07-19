// app/success/page.tsx
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import SuccessClient from "./SuccessClient";

export const runtime = "edge";

export const metadata = {
  title: "Success | Your Ecom",
  description: "Thanks for your purchase!",
};

async function verifyToken(token) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (err) {
    return null;
  }
}

export default async function SuccessPage() {
  const headersList = headers(); 
  const fullUrl = new URL(
    headersList.get("x-next-url"),
    "https://your-ecom.com"
  );
  const token = fullUrl.searchParams.get("token");

  if (!token) redirect("/");

  const payload = await verifyToken(token);

  if (!payload) redirect("/");

  return <SuccessClient name={payload.name || "customer"} />;
}
