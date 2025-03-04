import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  if (!sessionCookie) {
    console.log(request.url);

    const url = new URL("/login", request.url);
    url.searchParams.set(
      "redirect",
      request.nextUrl.pathname + request.nextUrl.search
    );

    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
