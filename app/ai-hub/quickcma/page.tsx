import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { QuickCMAForm } from "./quickcma-form"

export default function QuickCMAPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">QuickCMA</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Generate instant comparative market analysis reports with professional insights and data
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">📊 Market Analysis</CardTitle>
              <CardDescription>Comprehensive analysis of comparable properties and market trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Comparable property data</li>
                <li>• Price per square foot analysis</li>
                <li>• Market trend insights</li>
                <li>• Professional recommendations</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">📄 Professional Reports</CardTitle>
              <CardDescription>Detailed PDF reports ready for client presentation</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• PDF download option</li>
                <li>• Email delivery</li>
                <li>• Professional formatting</li>
                <li>• Branded presentation</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Generate CMA Report</CardTitle>
            <CardDescription>Enter a property address to generate a comprehensive market analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <QuickCMAForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
