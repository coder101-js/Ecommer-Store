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
    console.error("JWT verification failed:", err);
    return null;
  }
}

export default async function SuccessPage() {
  const headersList = headers();
  const urlHeader = headersList.get("x-next-url");

  if (!urlHeader) {
    console.warn("Missing x-next-url, redirecting");
    redirect("/");
  }

  let token;
  try {
    const fullUrl = new URL(urlHeader, "http://localhost:3000.com");
    token = fullUrl.searchParams.get("token");
  } catch (err) {
    console.error("Invalid URL from x-next-url", err);
    redirect("/");
  }

  if (!token) {
    console.warn("Missing token in URL, redirecting");
    redirect("/");
  }

  const payload = await verifyToken(token);
  if (!payload) {
    console.warn("Invalid or expired token, redirecting");
    redirect("/");
  }

  return <SuccessClient name={payload.name || "customer"} />;
}
