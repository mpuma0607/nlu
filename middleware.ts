import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Domain to tenant mapping
const domainTenantMap: Record<string, string> = {
  "beggins-university.com": "century21-beggins",
  "www.beggins-university.com": "century21-beggins",
  "beggins.thenextlevelu.com": "century21-beggins",
  "brokerage-pro.com": "brokerage-private",
  "www.brokerage-pro.com": "brokerage-private",
  "brokerage1.thenextlevelu.com": "brokerage-private",
  "international-realestate.com": "international",
  "www.international-realestate.com": "international",
  "international.thenextlevelu.com": "international",
}

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || ""

  // Check if the domain matches any tenant
  const tenantId = domainTenantMap[hostname]

  // Create response
  const response = NextResponse.next()

  // If we found a tenant for this domain, set a header
  // This is purely additive - doesn't change any existing behavior
  if (tenantId) {
    response.headers.set("x-tenant-id", tenantId)
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
