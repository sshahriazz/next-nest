import { type NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const cookies = req.headers.get("cookie");
  const token = cookies
    ?.split(";")
    .find((cookie) => cookie.trim().startsWith("accessToken="))
    ?.split("=")[1];

  if (!token || token === "null") {
    if (
      req.nextUrl.pathname !== "/auth/signin" &&
      req.nextUrl.pathname !== "/auth/signup"
    ) {
      if (
        req.nextUrl.pathname.split("/")[1] === "signin" ||
        req.nextUrl.pathname.split("/")[1] === "signup"
      ) {
        return NextResponse.redirect(
          new URL(`/auth/${req.nextUrl.pathname.split("/")[1]}`, req.url)
        );
      } else {
        return NextResponse.redirect(new URL(`/auth/signin`, req.url));
      }
    }
  } else {
    if (
      req.nextUrl.pathname === "/auth/signin" ||
      req.nextUrl.pathname === "/auth/signup"
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    } else {
      return NextResponse.next();
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
