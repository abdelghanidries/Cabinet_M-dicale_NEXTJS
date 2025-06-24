// types/next-auth.d.ts ou juste next-auth.d.ts à la racine

import  { DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      lastname : string;

    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: UserRole;
    lastname: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
    lastname: string;
  }
}
