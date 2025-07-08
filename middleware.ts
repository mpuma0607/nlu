import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Domain to tenant mapping - Phase 2: Adding test subdomains
const domainTenantMap: Record<string, string> = {
  // Phase 2: Test subdomains (replace 'yourdomain.com' with your actual domain)
  "beggins.thenextlevelu.com": "century21-beggins",
  "brokerage.thenextlevelu.com": "brokerage-private",
  "international.thenextlevelu.com": "international",

  // Phase 3: Custom domains
  "begginsagents.com": "century21-beggins",
  "www.begginsagents.com": "century21-beggins",
  "beggins-university.com": "century21-beggins",
  "www.beggins-university.com": "century21-beggins",
  "brokerage-pro.com": "brokerage-private",
  "www.brokerage-pro.com": "brokerage-private",
  "international-realestate.com": "international",
  "www.international-realestate.com": "international",

  // Empower AI domains
  "getempowerai.com": "empower-ai",
  "www.getempowerai.com": "empower-ai",

  // Local development testing
  "beggins.localhost": "century21-beggins",
  "brokerage.localhost": "brokerage-private",
  "international.localhost": "international",
  "empowerai.localhost": "empower-ai",
}

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || ""

  console.log(`[Middleware] Checking hostname: ${hostname}`)

  // Check if the domain matches any tenant
  const tenantId = domainTenantMap[hostname]

  // Create response
  const response = NextResponse.next()

  // If we found a tenant for this domain, set a header
  if (tenantId) {
    console.log(`[Middleware] Found tenant ${tenantId} for domain ${hostname}`)
    response.headers.set("x-tenant-id", tenantId)
    response.headers.set("x-detected-by", "domain")
  } else {
    console.log(`[Middleware] No tenant found for domain ${hostname}, using fallback methods`)
    response.headers.set("x-detected-by", "fallback")
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
