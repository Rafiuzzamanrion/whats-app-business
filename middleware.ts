import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { Role } from "@prisma/client";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Enhanced logging for production debugging
    console.log("=== MIDDLEWARE DEBUG ===");
    console.log("Pathname:", pathname);
    console.log("Token exists:", !!token);
    console.log(
      "Token details:",
      token
        ? {
            id: token.id,
            role: token.role,
            email: token.email,
          }
        : "No token",
    );
    console.log("User Agent:", req.headers.get("user-agent"));
    console.log("========================");

    // Check for missing token first
    if (!token) {
      console.log("No token found, redirecting to signin");

      return NextResponse.redirect(new URL("/auth/signin", req.url));
    }

    // Super admin routes (most restrictive)
    if (pathname.startsWith("/super-admin")) {
      if (token.role !== Role.SUPER_ADMIN) {
        console.log("Super admin access denied for role:", token.role);

        return NextResponse.redirect(new URL("/auth/signin", req.url));
      }
      console.log("Super admin access granted");
    }

    // Admin routes
    else if (pathname.startsWith("/admin")) {
      if (token.role !== Role.ADMIN && token.role !== Role.SUPER_ADMIN) {
        console.log("Admin access denied for role:", token.role);

        return NextResponse.redirect(new URL("/auth/signin", req.url));
      }
      console.log("Admin access granted");
    }

    // Dashboard routes
    else if (pathname.startsWith("/dashboard")) {
      console.log("Dashboard access granted");
    }

    // API routes
    if (pathname.startsWith("/api/super-admin")) {
      if (token.role !== Role.SUPER_ADMIN) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    if (pathname.startsWith("/api/admin")) {
      if (token.role !== Role.ADMIN && token.role !== Role.SUPER_ADMIN) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Enhanced debugging
        console.log("=== AUTHORIZED CALLBACK ===");
        console.log("Token exists:", !!token);
        console.log("Pathname:", req.nextUrl.pathname);
        console.log("Token role:", token?.role);
        console.log("===========================");

        // Always return true to let the middleware function handle the logic
        return true;
      },
    },
  },
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/super-admin/:path*",
    "/api/admin/:path*",
    "/api/super-admin/:path*",
  ],
};
