import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Get token with proper type
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET as string,
  });

  // Type guard for token
  if (!token?.id) {
    const loginUrl = new URL("/auth/signin", req.nextUrl.origin);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Apply middleware to protected routes
export const config = {
  matcher: ["/admin/:path*"],
};
