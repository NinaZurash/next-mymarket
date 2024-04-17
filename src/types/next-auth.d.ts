import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    username: string | null;
    emailVerified: Date | null;
    name: string | null;
    id: string;
    wishlist: string[];
  }
  interface Session {
    user: User & {
      username: string;
    };
    token: {
      username: string;
    };
  }
}
