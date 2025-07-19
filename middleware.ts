import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  try {
    // Get token with proper secret and cookie name
    // @ts-ignore
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
      // Specify the correct cookie name for production
      cookieName:
        process.env.NODE_ENV === "production"
          ? "__Secure-next-auth.session-token"
          : "next-auth.session-token",
      // Add salt for additional security
      // @ts-ignore
      salt:
        process.env.NODE_ENV === "production"
          ? "__Secure-next-auth.session-token"
          : "next-auth.session-token",
    });

    if (!token || !token.id) {
      const loginUrl = new URL("/auth/signin", req.nextUrl.origin);

      loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);

      return NextResponse.redirect(loginUrl);
    }

    const userRole = token.role as string;

    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      userRole !== "ADMIN" &&
      userRole !== "SUPER_ADMIN"
    ) {
      return NextResponse.redirect(
        new URL("/unauthorized", req.nextUrl.origin),
      );
    }

    if (req.nextUrl.pathname.startsWith("/dashboard") && userRole !== "USER") {
      return NextResponse.redirect(
        new URL("/unauthorized", req.nextUrl.origin),
      );
    }

    return NextResponse.next();
  } catch (error) {
    const loginUrl = new URL("/auth/signin", req.nextUrl.origin);

    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
