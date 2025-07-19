import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/auth/signin" },
  secret: process.env.NEXTAUTH_SECRET,
});
export const config = {
  runtime: "edge",
};
export const runtime = "edge"; // Use Edge Runtime for better performance