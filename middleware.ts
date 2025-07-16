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

    console.log("Middleware - Token exists:", !!token);
    console.log("Middleware - Token ID:", token?.id);
    console.log("Middleware - Token Role:", token?.role);

    // More robust token validation
    if (!token || !token.id) {
      console.log("Middleware - No valid token found, redirecting to signin");
      const loginUrl = new URL("/auth/signin", req.nextUrl.origin);

      loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);

      return NextResponse.redirect(loginUrl);
    }

    // Optional: Check for specific admin roles
    const userRole = token.role as string;

    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      userRole !== "ADMIN" &&
      userRole !== "SUPER_ADMIN"
    ) {
      console.log("Middleware - User doesn't have admin role:", userRole);

      return NextResponse.redirect(
        new URL("/unauthorized", req.nextUrl.origin),
      );
    }

    console.log("Middleware - Access granted");

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    const loginUrl = new URL("/auth/signin", req.nextUrl.origin);

    return NextResponse.redirect(loginUrl);
  }
}

// Apply middleware to protected routes
export const config = {
  matcher: [
    "/admin/:path*",
    // Add other protected routes as needed
  ],
};
