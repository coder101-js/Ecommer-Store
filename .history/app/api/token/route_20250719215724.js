import { SignJWT } from "jose";

export const runtime = "edge"; 

export async function POST(request) {
  const body = await request.json();

  if (!body || !body.userId) {
    return new Response(JSON.stringify({ error: "Missing userId" }), {
      status: 400,
    });
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  const token = await new SignJWT({ ...body }) // you can include whatever: userId, name, orderId, etc
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("5m") // ⏳ 5 min expiry
    .sign(secret);

  return new Response(JSON.stringify({ token }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
