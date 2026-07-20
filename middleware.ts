import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const response = NextResponse.next();

  if (url.searchParams.has("preview") || url.searchParams.has("bypass")) {
    const val = url.searchParams.get("preview") ?? url.searchParams.get("bypass");
    if (val === "false" || val === "0" || val === "off") {
      response.cookies.delete("sf_preview");
    } else {
      response.cookies.set("sf_preview", "true", {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
      });
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, tab-icon.svg (favicon files)
     */
    "/((?!_next/static|_next/image|favicon.ico|tab-icon.svg).*)",
  ],
};
