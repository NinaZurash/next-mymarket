import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    username: string | null;
    emailVerified: Date | null;
    name: string | null;
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
