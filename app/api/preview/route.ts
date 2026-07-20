import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const cookieStore = await cookies();

  if (url.searchParams.get("disable") === "true") {
    cookieStore.delete("sf_preview");
  } else {
    cookieStore.set("sf_preview", "true", {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });
  }

  const redirectUrl = url.searchParams.get("redirect") || "/";
  return NextResponse.redirect(new URL(redirectUrl, request.url));
}
