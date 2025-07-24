import { SignJWT } from "jose";
async function generateToken(payload, exp = "5m") {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not set");

  const encoded = new TextEncoder().encode(secret);
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(exp.toString())
    .sign(encoded);
}

export default generateToken;
