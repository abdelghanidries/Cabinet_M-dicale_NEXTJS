import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import { 
  
  ADMIN_LOGIN_REDIRECT,
  
} from "@/routes";
import { getUserById } from "@/data/data";


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
        token.name = existingUser.name;
        token.lastname = existingUser.lastname;
        token.doctorSpecialit = existingUser.doctorSpeciality;
        
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
        session.user.lastname = token.lastname ;
        session.user.doctorSpeciality  = token.doctorSpecialit;
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