import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import { 
  DEFAULT_LOGIN_REDIRECT, 
  ADMIN_LOGIN_REDIRECT,
  publicRoutes 
} from "@/routes";
import { getUserById } from "@/data/data";
import { UserRole } from "@prisma/client"; // Vérifie bien que ce fichier contient "ADMIN" sous forme de string

export const { 
  auth, 
  handlers, 
  signIn, 
  signOut 
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token }) {
      console.log("🔍 JWT callback triggered");
      console.log("🔍 Token before:", token);
  
      if (!token.sub) return token;
  
      const existingUser = await getUserById(token.sub);
      

      if (existingUser) {
        token.id = existingUser.id;
        token.role = existingUser.role;
        console.log("🔍 Token after:", token);
      }
  
      return token;
    },
  
    async session({ token, session }) {
      console.log("🔍 Session callback triggered");
      console.log("🔍 Token in session:", token);
  
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.role = token.role || "USER";
      }
  
      console.log("🔍 Final session:", session);
      return session;
    },
  
    async redirect({ url, baseUrl, token }) {
      console.log("🔍 Redirect callback triggered");
      console.log("🔍 Token role:", token?.role);
  
      if (token?.role === "ADMIN") {
        console.log("🚀 Redirecting to ADMIN dashboard");
        return `${baseUrl}${ADMIN_LOGIN_REDIRECT}`;
      }
  
      console.log("🚀 Redirecting to DEFAULT dashboard");
      return url.startsWith(baseUrl) ? url : baseUrl;
    }
  },
  
  ...authConfig
});
console.log("🚀 NextAuth initialized");