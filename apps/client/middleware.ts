import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { headers } = request;
  const cookies = headers.get("cookie");

  if (cookies) {
    const token = cookies
      .split(";")
      .find((cookie) => cookie.trim().startsWith("accessToken="));
    if (token) {
      const accessToken = token.split("=")[1];
      if (accessToken) {
        if (request.nextUrl.pathname === "/auth/signin") {
          return NextResponse.redirect(new URL("/", request.url));
        }
        if (request.nextUrl.pathname === "/auth/signup") {
          return NextResponse.redirect(new URL("/", request.url));
        } else return NextResponse.next();
      } else {
        return NextResponse.redirect("http://localhost:3000/auth/signin");
      }
    }
  } else {
    if (request.nextUrl.pathname === "/auth/signin") {
      return NextResponse.next();
    }
    if (request.nextUrl.pathname === "/auth/signup") {
      return NextResponse.next();
    }
    return NextResponse.redirect("http://localhost:3000/auth/signin");
  }
}

export const config = {
  matcher: ["/", "/auth/:path*"],
};
