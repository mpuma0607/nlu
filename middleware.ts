import { type NextRequest, NextResponse } from "next/server"
import { defaultTenantConfig } from "@/lib/tenants/default"
import { brokeragePrivateConfig } from "@/lib/tenants/brokerage-private"
import { internationalConfig } from "@/lib/tenants/international"
import { century21BegginsConfig } from "@/lib/tenants/century21-beggins"

const tenantConfigs = {
  default: defaultTenantConfig,
  "brokerage-private": brokeragePrivateConfig,
  international: internationalConfig,
  "century21-beggins": century21BegginsConfig,
}

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || ""

  // Find tenant by domain
  let tenantId = "default"

  for (const [id, config] of Object.entries(tenantConfigs)) {
    if (config.domain.some((domain) => hostname.includes(domain))) {
      tenantId = id
      break
    }
  }

  // Add tenant info to headers for the app to use
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-tenant-id", tenantId)
  requestHeaders.set("x-hostname", hostname)

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
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
