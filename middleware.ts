import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { Role } from "@prisma/client";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    console.log("Middleware - pathname:", pathname);
    console.log(
      "Middleware - token:",
      token ? { role: token.role, email: token.email } : "No token",
    );

    // Super admin routes (check this first, more restrictive)
    if (pathname.startsWith("/super-admin")) {
      if (!token || token.role !== Role.SUPER_ADMIN) {
        console.log("Super admin access denied, redirecting to signin");

        return NextResponse.redirect(new URL("/auth/signin", req.url));
      }
      console.log("Super admin access granted");

      return NextResponse.next();
    }

    // Admin routes (less restrictive than super admin)
    if (pathname.startsWith("/admin")) {
      if (
        !token ||
        (token.role !== Role.ADMIN && token.role !== Role.SUPER_ADMIN)
      ) {
        console.log("Admin access denied, redirecting to signin");

        return NextResponse.redirect(new URL("/auth/signin", req.url));
      }
      console.log("Admin access granted");

      return NextResponse.next();
    }

    // API routes protection
    if (pathname.startsWith("/api/super-admin")) {
      if (!token || token.role !== Role.SUPER_ADMIN) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    if (pathname.startsWith("/api/admin")) {
      if (
        !token ||
        (token.role !== Role.ADMIN && token.role !== Role.SUPER_ADMIN)
      ) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // For debugging in production
        console.log("Auth callback - token exists:", !!token);
        console.log("Auth callback - pathname:", req.nextUrl.pathname);

        // Always return true here and handle authorization in the middleware function
        // This ensures the middleware function always runs
        return true;
      },
    },
  },
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/super-admin/:path*",
    "/api/admin/:path*",
    "/api/super-admin/:path*",
  ],
};
