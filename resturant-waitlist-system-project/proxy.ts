import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/staff/login") {
    return NextResponse.next();
  }

  if (!request.cookies.has("staff-session")) {
    return NextResponse.redirect(new URL("/staff/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/staff/:path*"],
};
