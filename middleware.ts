// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { Role } from "@prisma/client";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Admin routes
    if (pathname.startsWith("/admin")) {
      if (
        !token ||
        (token.role !== Role.ADMIN && token.role !== Role.SUPER_ADMIN)
      ) {
        return NextResponse.redirect(new URL("/auth/signin", req.url));
      }
    }

    // Super admin routes
    if (pathname.startsWith("/super-admin")) {
      if (!token || token.role !== Role.SUPER_ADMIN) {
        return NextResponse.redirect(new URL("/auth/signin", req.url));
      }
    }


    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
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
