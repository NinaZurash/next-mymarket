import { compare } from "bcrypt";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { db } from "./db";

type User = {
  id: string;
  email: string;
  username: string;
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await db.user.findUnique({
          where: { email: credentials.email },
          include: { wishlist: true },
        });

        if (!user) {
          console.log("User not found");
          return null;
        }

        if (credentials.password !== user.password) {
          return null;
        }

        const wishlistProducts = user.wishlist.map((product) => product.id);

        return {
          id: user.id + "",
          email: user.email,
          username: user.username,
          emailVerified: user.emailVerified,
          name: user.name,
          wishlist: wishlistProducts,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          username: user.username,
          emailVerified: user.emailVerified,
          name: user.name,
          id: user.id,
          wishlist: user.wishlist,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
          emailVerified: token.emailVerified,
          name: token.name,
          id: token.id,
          wishlist: token.wishlist,
        },
      };
    },
  },
};
