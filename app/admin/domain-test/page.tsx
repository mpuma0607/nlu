"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getTenantConfig, getAllTenants } from "@/lib/tenant-config"

export default function DomainTestPage() {
  const [currentTenant, setCurrentTenant] = useState<any>(null)
  const [hostname, setHostname] = useState<string>("")
  const [urlParams, setUrlParams] = useState<string>("")
  const [localStorage, setLocalStorage] = useState<string>("")

  useEffect(() => {
    const config = getTenantConfig()
    setCurrentTenant(config)
    setHostname(window.location.hostname)
    setUrlParams(new URLSearchParams(window.location.search).get("tenant") || "none")
    setLocalStorage(window.localStorage.getItem("preview-tenant") || "none")
  }, [])

  const testDomainDetection = () => {
    // Force refresh to test domain detection
    window.location.reload()
  }

  const clearOverrides = () => {
    localStorage.removeItem("preview-tenant")
    const url = new URL(window.location.href)
    url.searchParams.delete("tenant")
    window.location.href = url.toString()
  }

  if (!currentTenant) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Domain Detection Test</h1>
        <Badge variant="outline">Phase 1: Non-Breaking Testing</Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current Tenant Detection</CardTitle>
            <CardDescription>Shows which tenant is currently active and why</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Active Tenant:</span>
              <Badge variant="default">{currentTenant.name}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Tenant ID:</span>
              <code className="text-sm bg-muted px-2 py-1 rounded">{currentTenant.id}</code>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Current Domain:</span>
              <code className="text-sm bg-muted px-2 py-1 rounded">{hostname}</code>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detection Methods</CardTitle>
            <CardDescription>Shows which detection methods are active</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">URL Parameter:</span>
              <code className="text-sm bg-muted px-2 py-1 rounded">{urlParams}</code>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">LocalStorage:</span>
              <code className="text-sm bg-muted px-2 py-1 rounded">{localStorage}</code>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Domain Detection:</span>
              <Badge
                variant={
                  hostname.includes("beggins") || hostname.includes("brokerage") || hostname.includes("international")
                    ? "default"
                    : "secondary"
                }
              >
                {hostname.includes("beggins") || hostname.includes("brokerage") || hostname.includes("international")
                  ? "Active"
                  : "Inactive"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Tenants</CardTitle>
          <CardDescription>All configured tenants and their domains</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {getAllTenants().map((tenant) => (
              <div key={tenant.id} className="flex items-center justify-between p-3 border rounded">
                <div>
                  <span className="font-medium">{tenant.name}</span>
                  <code className="ml-2 text-sm text-muted-foreground">({tenant.id})</code>
                </div>
                <Badge variant={currentTenant.id === tenant.id ? "default" : "outline"}>
                  {currentTenant.id === tenant.id ? "Active" : "Inactive"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Test Actions</CardTitle>
          <CardDescription>Actions to test domain detection functionality</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button onClick={testDomainDetection} variant="outline">
              Refresh & Test Domain Detection
            </Button>
            <Button onClick={clearOverrides} variant="outline">
              Clear All Overrides
            </Button>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>
              <strong>Testing Tips:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>URL parameters and localStorage still work exactly as before</li>
              <li>Domain detection is additive - it won't break existing functionality</li>
              <li>Test with ?tenant=century21-beggins to verify existing methods work</li>
              <li>Clear overrides to test pure domain detection</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
