import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const publicPaths = ["/login", "/register"]
  const isPublicPath = publicPaths.includes(path)

  // Define admin paths that require admin role
  const isAdminPath = path.startsWith("/admin")

  // Get the session token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // Redirect logic for public paths
  if (isPublicPath) {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    return NextResponse.next()
  }

  // Redirect logic for protected paths
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Redirect logic for admin paths
  if (isAdminPath && token.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

// Configure the paths that should be processed by this middleware
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/register"],
}

