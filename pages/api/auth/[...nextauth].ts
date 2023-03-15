import bcrypt from "bcryptjs";
import Cookies from "js-cookie";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import db from "database";
import { User } from "models";
import clientPromise from "lib/mongodb";

const options: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Accessoriess Hubb",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await db.connect();
        const user = await User.findOne({ email: credentials?.email });
        await db.disconnect();

        if (
          user &&
          bcrypt.compareSync(credentials?.password as string, user.password)
        ) {
          console.log(user);
          return user;
        }
        throw new Error("Invalid email or password");
      },
    }),
  ],

  callbacks: {
    session: async ({ session, token }) => {
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.verified = token.verified;
      session.user.isAdmin = token.isAdmin;
      session.user.phoneNumber = token.phoneNumber;

      return session;
    },
  },

  secret: process.env.NEXT_APP_JWT_SECRET,

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  debug: process.env.NODE_ENV === "development",
};

export default NextAuth(options);
