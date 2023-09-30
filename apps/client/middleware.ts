import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const cookie = cookies();

  console.log(
    "middleware",

    cookie.get("refresh_token")
  );
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: "/:path*",
// };
