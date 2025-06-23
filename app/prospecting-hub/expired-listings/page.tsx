import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Search, MessageSquare, Repeat } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ExpiredListingsPage() {
  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
              <Clock className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-black">Expired Listings</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Turn expired listings into new opportunities with our proven 3-step system: Find them, Connect with them,
            and Market to them effectively.
          </p>
        </div>

        {/* Expired Listings Success System */}
        <Card className="max-w-4xl mx-auto mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-black text-center">Expired Listings Success System</CardTitle>
            <CardDescription className="text-center">
              Everything you need to convert expired listings into new clients
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid-cols-1">
              <div className="space-y-4">
                <h4 className="font-semibold text-black">What You'll Get:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>✅ Complete expired listing prospecting system</li>
                  <li>✅ Empathetic scripts and objection handlers</li>
                  <li>✅ Market analysis templates and pricing strategies</li>
                  <li>✅ Email and direct mail templates</li>
                  <li>✅ Follow-up sequences and nurture campaigns</li>
                  <li>✅ Conversion tracking tools</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3-Step Process */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Step 1: How to Find Them */}
          <Card className="border-2 border-blue-200 hover:border-blue-500 transition-colors">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-white" />
              </div>
              <Badge className="bg-blue-500 text-white mb-2">Step 1</Badge>
              <CardTitle className="text-xl text-black">How to Find Them</CardTitle>
              <CardDescription>Discover the best sources and strategies for locating expired listings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-black mb-3">Key Sources for Expired Listings:</h4>
                  <div className="grid grid-cols-1 gap-y-2 text-sm text-gray-600">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-1.5"></div>
                      <p>
                        <span className="font-medium">MLS System:</span> Daily expired listing reports
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-1.5"></div>
                      <p>
                        <span className="font-medium">Zillow/Realtor.com:</span> Track listings that disappear
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-1.5"></div>
                      <p>
                        <span className="font-medium">Lead Services:</span> RedX, Vulcan7, FSBO.com
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-1.5"></div>
                      <p>
                        <span className="font-medium">Public Records:</span> County assessor websites
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-1.5"></div>
                      <p>
                        <span className="font-medium">Agent Networks:</span> Other agents' expired listings
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-1.5"></div>
                      <p>
                        <span className="font-medium">Drive Neighborhoods:</span> Look for removed signs
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 2: Scripts and What to Say */}
          <Card className="border-2 border-green-200 hover:border-green-500 transition-colors">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <Badge className="bg-green-500 text-white mb-2">Step 2</Badge>
              <CardTitle className="text-xl text-black">Scripts & What to Say</CardTitle>
              <CardDescription>
                Empathetic conversation starters and objection handling for expired sellers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="phone-scripts" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="phone-scripts">Phone Scripts</TabsTrigger>
                  <TabsTrigger value="email-scripts">Email Scripts</TabsTrigger>
                  <TabsTrigger value="text-scripts">Text Scripts</TabsTrigger>
                  <TabsTrigger value="practice">Practice</TabsTrigger>
                </TabsList>

                <TabsContent value="phone-scripts" className="space-y-6 mt-6">
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-bold text-black mb-4 text-lg">Expired Listing Cold Call Script</h4>
                    <div className="text-sm text-gray-700 space-y-3 max-h-96 overflow-y-auto">
                      <p>
                        <strong>Opening:</strong> Hi, is this [Name]? This is [Your Name] with [Brokerage]. I noticed
                        your home on [Street Name] was recently on the market. I'm sorry it didn't work out. Do you have
                        a quick minute?
                      </p>

                      <p>
                        <strong>Empathy:</strong> I know how disappointing it can be when a home doesn't sell. I've
                        helped many homeowners in similar situations get their homes sold successfully.
                      </p>

                      <div className="space-y-2">
                        <p>
                          <strong>Discovery Questions:</strong>
                        </p>
                        <p>1. How long was it on the market?</p>
                        <p>2. How many showings did you have?</p>
                        <p>3. Any offers at all?</p>
                        <p>4. What do you think went wrong?</p>
                        <p>5. Are you still interested in selling?</p>
                        <p>6. What would need to be different this time?</p>
                      </div>

                      <p>
                        <strong>Value Offer:</strong> I'd love to do a complimentary market analysis to show you what's
                        changed since your listing expired and what we'd need to do differently to get it sold.
                      </p>

                      <p>
                        <strong>Close:</strong> Would you be open to a brief meeting where I can show you exactly why it
                        didn't sell and what we can do to fix it?
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="email-scripts" className="space-y-6 mt-6">
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-bold text-black mb-4 text-lg">Expired Listing Email Templates</h4>
                    <div className="text-sm text-gray-700 space-y-4">
                      <div>
                        <p>
                          <strong>Subject: Your Home on [Street Name] - What Went Wrong?</strong>
                        </p>
                        <div className="bg-white p-4 rounded border mt-2">
                          <p>Hi [Name],</p>
                          <p>
                            I noticed your home on [Street Name] was recently on the market but didn't sell. I'm sorry -
                            I know how frustrating that must be.
                          </p>
                          <p>
                            As a local real estate professional, I've helped many homeowners in your exact situation get
                            their homes sold successfully the second time around.
                          </p>
                          <p>I'd like to offer you a complimentary analysis showing:</p>
                          <ul>
                            <li>• Why your home likely didn't sell</li>
                            <li>• What's changed in the market since then</li>
                            <li>• Exactly what we'd do differently this time</li>
                            <li>• A realistic timeline and pricing strategy</li>
                          </ul>
                          <p>
                            There's no obligation - just helpful information to help you make the best decision for your
                            situation.
                          </p>
                          <p>
                            Best regards,
                            <br />
                            [Your Name]
                            <br />
                            [Your Contact Info]
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="text-scripts" className="space-y-6 mt-6">
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-bold text-black mb-4 text-lg">Expired Listing Text Templates</h4>
                    <div className="text-sm text-gray-700 space-y-4">
                      <div className="bg-white p-4 rounded border">
                        <p>
                          <strong>Initial Contact:</strong>
                        </p>
                        <p>
                          "Hi [Name], sorry your home on [Street] didn't sell. I help homeowners in this situation get
                          sold the 2nd time. Would you like to know what went wrong?"
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded border">
                        <p>
                          <strong>Follow-up:</strong>
                        </p>
                        <p>
                          "Hi [Name], still thinking about selling? I have a free analysis showing exactly why it didn't
                          sell and how to fix it. No obligation!"
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="practice" className="space-y-6 mt-6">
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                      <h4 className="font-bold text-black mb-4 text-lg">Expired Listing Roleplay Practice with AI</h4>
                      <p className="text-gray-700 mb-4">
                        Practice your expired listing scripts with our advanced voice AI. Learn to handle disappointment
                        and objections with empathy.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <iframe
                        src="https://cerebras.vercel.app/"
                        width="100%"
                        height="700"
                        style={{ border: "none", borderRadius: "8px" }}
                        title="Cerebras Voice AI - Expired Listing Roleplay Training"
                        allow="microphone *; camera *; fullscreen *; autoplay *; clipboard-read; clipboard-write"
                        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-presentation allow-downloads allow-pointer-lock allow-top-navigation"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Step 3: Marketing & Rinse and Repeat */}
          <Card className="border-2 border-purple-200 hover:border-purple-500 transition-colors">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Repeat className="h-8 w-8 text-white" />
              </div>
              <Badge className="bg-purple-500 text-white mb-2">Step 3</Badge>
              <CardTitle className="text-xl text-black">Marketing & Repeat</CardTitle>
              <CardDescription>
                Marketing materials and follow-up strategies to nurture expired listing relationships
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h4 className="font-semibold text-black mb-4">Expired Listing Marketing Materials</h4>
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <iframe
                    src="https://drive.google.com/embeddedfolderview?id=1G6SZedUC23xxlfvNUDjrqMZNWBDgPmoS#grid"
                    style={{ width: "100%", height: "600px", border: 0 }}
                    title="Expired Listing Marketing Materials"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
