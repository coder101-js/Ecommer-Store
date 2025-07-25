import { SignJWT, jwtVerify, errors } from 'jose';

// Generate JWT Token
export async function generateToken(payload, exp = '5m') {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not set');

  const encoded = new TextEncoder().encode(secret);

  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime(exp)
    .setIssuedAt()
    .sign(encoded);
}


export async function verifyToken(token) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not set');

  try {
    const encoded = new TextEncoder().encode(secret);
    const { payload } = await jwtVerify(token, encoded, {
      clockTolerance: 0 
    });

    return payload;
  } catch (err) {
    if (err instanceof errors.JWTExpired) {
      console.warn('❌ Token expired');
    } else if (err instanceof errors.JWSSignatureVerificationFailed) {
      console.warn('❌ Invalid signature — token might be tampered');
    } else {
      console.error('❌ Token verification error:', err.message);
    }
    return null;
  }
}
