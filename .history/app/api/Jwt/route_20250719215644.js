import { SignJWT } from "jose";

export  async function generateJWT(payload) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("5m")
    .sign(secret);
  return token;
}
