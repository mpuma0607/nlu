import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Home, Search, MessageSquare, Repeat } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FSBOPage() {
  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <Home className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-black">For Sale By Owner (FSBO)</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master the art of converting FSBO sellers into clients with our proven 3-step system: Find them, Connect
            with them, and Market to them effectively.
          </p>
        </div>

        {/* FSBO Success System */}
        <Card className="max-w-4xl mx-auto mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-black text-center">FSBO Success System</CardTitle>
            <CardDescription className="text-center">
              Everything you need to become the go-to agent for FSBO sellers in your area
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid-cols-1">
              <div className="space-y-4">
                <h4 className="font-semibold text-black">What You'll Get:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>✅ Complete FSBO prospecting system</li>
                  <li>✅ Proven conversion scripts and objection handlers</li>
                  <li>✅ FSBO seller guides and market analyses</li>
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
              <CardDescription>Discover the best sources and strategies for locating FSBO sellers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-black mb-3">Key Sources for FSBO Sellers:</h4>
                  <div className="grid grid-cols-1 gap-y-2 text-sm text-gray-600">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-1.5"></div>
                      <p>
                        <span className="font-medium">Craigslist:</span> Search "For Sale By Owner" in real estate
                        section
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-1.5"></div>
                      <p>
                        <span className="font-medium">Facebook Marketplace:</span> Local FSBO listings and groups
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-1.5"></div>
                      <p>
                        <span className="font-medium">FSBO Websites:</span> ForSaleByOwner.com, Fizber.com
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-1.5"></div>
                      <p>
                        <span className="font-medium">Yard Signs:</span> Drive neighborhoods looking for FSBO signs
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-1.5"></div>
                      <p>
                        <span className="font-medium">Zillow/Realtor.com:</span> Filter for "For Sale By Owner"
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-1.5"></div>
                      <p>
                        <span className="font-medium">Local Newspapers:</span> Classified ads section
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
              <CardDescription>Proven conversation starters and objection handling for FSBO sellers</CardDescription>
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
                    <h4 className="font-bold text-black mb-4 text-lg">FSBO Cold Call Script</h4>
                    <div className="text-sm text-gray-700 space-y-3 max-h-96 overflow-y-auto">
                      <p>
                        <strong>Opening:</strong> Hi, is this [Name]? This is [Your Name] with [Brokerage]. I noticed
                        your home for sale on [Street Name]. Do you have a quick minute?
                      </p>

                      <p>
                        <strong>Purpose:</strong> I'm not calling to try to get your listing. I'm calling because I work
                        in your neighborhood and I'm curious - how's it going so far?
                      </p>

                      <div className="space-y-2">
                        <p>
                          <strong>Discovery Questions:</strong>
                        </p>
                        <p>1. How long has it been on the market?</p>
                        <p>2. How many showings have you had?</p>
                        <p>3. Any offers yet?</p>
                        <p>4. What made you decide to sell it yourself?</p>
                        <p>5. Have you sold a home before?</p>
                        <p>6. What's been the biggest challenge so far?</p>
                      </div>

                      <p>
                        <strong>Value Offer:</strong> Well, I'd love to help you succeed. I have some market data for
                        your area that might be helpful. Would you mind if I sent that over?
                      </p>

                      <p>
                        <strong>Close:</strong> If things don't work out the way you're hoping, would you be open to a
                        conversation about other options?
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="email-scripts" className="space-y-6 mt-6">
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-bold text-black mb-4 text-lg">FSBO Email Templates</h4>
                    <div className="text-sm text-gray-700 space-y-4">
                      <div>
                        <p>
                          <strong>Subject: Your Home on [Street Name]</strong>
                        </p>
                        <div className="bg-white p-4 rounded border mt-2">
                          <p>Hi [Name],</p>
                          <p>
                            I noticed your beautiful home for sale on [Street Name]. As a local real estate professional
                            who works in your neighborhood, I wanted to reach out and see how things are going.
                          </p>
                          <p>
                            I'm not writing to try to get your listing - I respect your decision to sell it yourself.
                            I'm writing because I have some recent market data for your area that you might find
                            helpful.
                          </p>
                          <p>
                            Would you like me to send over a complimentary market analysis showing what similar homes
                            have sold for recently? It might help you with your pricing strategy.
                          </p>
                          <p>Best of luck with your sale!</p>
                          <p>
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
                    <h4 className="font-bold text-black mb-4 text-lg">FSBO Text Templates</h4>
                    <div className="text-sm text-gray-700 space-y-4">
                      <div className="bg-white p-4 rounded border">
                        <p>
                          <strong>Initial Contact:</strong>
                        </p>
                        <p>
                          "Hi [Name]! Saw your home for sale on [Street]. I work in your neighborhood. How's it going so
                          far? Any way I can help?"
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded border">
                        <p>
                          <strong>Follow-up:</strong>
                        </p>
                        <p>
                          "Hi [Name], how's the sale going? I have some recent market data for your area if you'd find
                          that helpful. No strings attached!"
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="practice" className="space-y-6 mt-6">
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                      <h4 className="font-bold text-black mb-4 text-lg">FSBO Roleplay Practice with AI</h4>
                      <p className="text-gray-700 mb-4">
                        Practice your FSBO scripts with our advanced voice AI. Learn to handle objections and build
                        rapport with FSBO sellers.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <iframe
                        src="https://cerebras.vercel.app/"
                        width="100%"
                        height="700"
                        style={{ border: "none", borderRadius: "8px" }}
                        title="Cerebras Voice AI - FSBO Roleplay Training"
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
                Marketing materials and follow-up strategies to nurture FSBO relationships
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h4 className="font-semibold text-black mb-4">FSBO Marketing Materials</h4>
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <iframe
                    src="https://drive.google.com/embeddedfolderview?id=1tYrdrw4_zATfQDsiG_B8R7iX6JoSVayt#grid"
                    style={{ width: "100%", height: "600px", border: 0 }}
                    title="FSBO Marketing Materials"
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
