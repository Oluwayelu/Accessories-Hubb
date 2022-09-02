import NextAuth, { DefaultSession } from "next-auth";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      verified: string;
      isAdmin: boolean;
      phoneNumber: string;
    } & DefaultSession["user"];
  }

  interface User {
    data: { token: string; refreshToken } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    verified: string;
    isAdmin: boolean;
    phoneNumber: string;
  }
}
