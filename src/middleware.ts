import { getToken } from "next-auth/jwt";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export async function middleware(request: NextRequest) {
  const token = (await getToken({ req: request })) as {
    emailVerified: null | boolean;
  };

  if (request.url.includes("email-verification") || request.url.includes("sign-in")) {
    if (token) {
      return token.emailVerified && NextResponse.redirect("http://localhost:3000");
    }
  }
}
