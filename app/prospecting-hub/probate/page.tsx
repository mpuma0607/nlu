import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Home, Search, MessageSquare, Repeat } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProbatePage() {
  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
              <Home className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-black">Probate Leads</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Help families navigate probate real estate with compassion and professionalism using our proven 3-step
            system: Find them, Connect with them, and Market to them effectively.
          </p>
        </div>

        {/* Probate Success System */}
        <Card className="max-w-4xl mx-auto mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-black text-center">Probate Success System</CardTitle>
            <CardDescription className="text-center">
              Everything you need to compassionately serve families dealing with inherited property
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid-cols-1">
              <div className="space-y-4">
                <h4 className="font-semibold text-black">What You'll Get:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>✅ Complete probate lead prospecting system</li>
                  <li>✅ Compassionate scripts and conversation guides</li>
                  <li>✅ Educational materials for families</li>
                  <li>✅ Email and text templates</li>
                  <li>✅ Follow-up sequences</li>
                  <li>✅ Legal compliance guidelines</li>
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
              <CardDescription>
                Discover ethical and respectful ways to identify probate opportunities in your market
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-black mb-3">Key Sources for Probate Leads:</h4>
                  <div className="grid grid-cols-1 gap-y-2 text-sm text-gray-600">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-1.5"></div>
                      <p>
                        <span className="font-medium">Probate Court Records:</span> Monitor local courthouse filings for
                        new probate cases
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-1.5"></div>
                      <p>
                        <span className="font-medium">Probate Attorneys:</span> Build relationships with estate planning
                        lawyers
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-1.5"></div>
                      <p>
                        <span className="font-medium">Estate Sale Companies:</span> Partner with professionals handling
                        estate sales
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-1.5"></div>
                      <p>
                        <span className="font-medium">Obituary Monitoring:</span> Respectfully track obituaries of
                        property owners
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-1.5"></div>
                      <p>
                        <span className="font-medium">Public Records:</span> Research property ownership and inheritance
                        transfers
                      </p>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-1.5"></div>
                      <p>
                        <span className="font-medium">Professional Networks:</span> Connect with CPAs, financial
                        planners, and trust officers
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold text-black mb-3">
                    Building Relationships with Probate Attorneys & Estate Planners:
                  </h4>
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <div className="space-y-4 text-sm text-gray-700">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-semibold text-blue-900 mb-2">Research & Networking</h5>
                          <ul className="space-y-2">
                            <li>• Use local bar association directories</li>
                            <li>• Join estate planning councils</li>
                            <li>• Attend networking events and seminars</li>
                            <li>• Participate in professional organizations</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-semibold text-blue-900 mb-2">Value Creation</h5>
                          <ul className="space-y-2">
                            <li>• Host educational seminars on market trends</li>
                            <li>• Build strong online presence</li>
                            <li>• Co-create content and webinars</li>
                            <li>• Share regular market updates</li>
                          </ul>
                        </div>
                      </div>

                      <div className="border-t border-blue-200 pt-4">
                        <h5 className="font-semibold text-blue-900 mb-2">Your Value Proposition to Attorneys:</h5>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="text-center">
                            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                              <span className="text-white font-bold">E</span>
                            </div>
                            <p className="font-medium">Expertise</p>
                            <p className="text-xs">Local market knowledge & probate experience</p>
                          </div>
                          <div className="text-center">
                            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                              <span className="text-white font-bold">S</span>
                            </div>
                            <p className="font-medium">Sensitivity</p>
                            <p className="text-xs">Compassionate handling of emotional situations</p>
                          </div>
                          <div className="text-center">
                            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                              <span className="text-white font-bold">E</span>
                            </div>
                            <p className="font-medium">Efficiency</p>
                            <p className="text-xs">Swift sales reducing estate limbo time</p>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-blue-200 pt-4">
                        <h5 className="font-semibold text-blue-900 mb-2">Relationship Building Steps:</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="font-medium mb-1">1-6: Initial Outreach</p>
                            <ul className="text-xs space-y-1">
                              <li>• Schedule one-on-one meetings</li>
                              <li>• Offer coffee/lunch discussions</li>
                              <li>• Propose collaboration opportunities</li>
                              <li>• Share market insights regularly</li>
                              <li>• Be genuine, avoid being salesy</li>
                              <li>• Focus on building trust</li>
                            </ul>
                          </div>
                          <div>
                            <p className="font-medium mb-1">7-12: Relationship Maintenance</p>
                            <ul className="text-xs space-y-1">
                              <li>• Provide excellent service on referrals</li>
                              <li>• Send thank-you notes for referrals</li>
                              <li>• Celebrate mutual successes</li>
                              <li>• Regular check-ins and updates</li>
                              <li>• Nurture long-term connections</li>
                              <li>• Position as go-to probate expert</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                  <h5 className="font-semibold text-amber-900 mb-2">⚠️ Important Ethical Guidelines</h5>
                  <ul className="text-sm text-amber-800 space-y-1">
                    <li>• Always approach with genuine compassion and respect</li>
                    <li>• Wait appropriate time after death before initial contact</li>
                    <li>• Focus on helping, not just getting listings</li>
                    <li>• Understand the emotional state of grieving families</li>
                    <li>• Comply with all local and state regulations</li>
                  </ul>
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
              <CardDescription>Compassionate scripts and conversation guides for probate situations</CardDescription>
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
                    <h4 className="font-bold text-black mb-4 text-lg">Initial Probate Contact Script</h4>
                    <div className="text-sm text-gray-700 space-y-3 max-h-96 overflow-y-auto">
                      <p>
                        <strong>Opening:</strong> Hi [Name], my name is [Your Name] and I'm a local real estate
                        professional with Century 21 Beggins. First, please accept my sincere condolences for the loss
                        of your [relationship - father, mother, etc.].
                      </p>

                      <p>
                        <strong>Purpose:</strong> I specialize in helping families navigate real estate decisions during
                        probate situations. I understand this can be an overwhelming time, and I'm here to help make the
                        process as smooth as possible for you and your family.
                      </p>

                      <div className="space-y-2">
                        <p>
                          <strong>Discovery Questions:</strong>
                        </p>
                        <p>1. Have you had a chance to think about what you'd like to do with the property?</p>
                        <p>2. Are there other family members involved in the decision-making process?</p>
                        <p>3. Have you spoken with the probate attorney yet?</p>
                        <p>4. What's your timeline looking like for making decisions about the property?</p>
                        <p>5. Have you had any experience with probate real estate before?</p>
                      </div>

                      <p>
                        <strong>Value Proposition:</strong> I work specifically with families in probate situations and
                        understand the unique challenges you're facing. I can help coordinate with your attorney, handle
                        all the paperwork, and ensure we follow all court requirements. My goal is to make this as
                        stress-free as possible while maximizing the value for your family.
                      </p>

                      <p>
                        <strong>Close:</strong> Would it be helpful if I prepared a current market analysis for the
                        property? This would give you and your family a clear picture of the property's value to help
                        with your decision-making. When would be a good time for me to stop by and take a look at the
                        property?
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-6">
                    <h4 className="font-bold text-black mb-4 text-lg">Follow-up Probate Script</h4>
                    <div className="text-sm text-gray-700 space-y-3 max-h-96 overflow-y-auto">
                      <p>
                        <strong>Opening:</strong> Hi [Name], this is [Your Name] from Century 21 Beggins. I wanted to
                        follow up on our conversation about the property at [Address]. How are you and your family
                        doing?
                      </p>

                      <p>
                        <strong>Check-in:</strong> I know these decisions take time, and there's no pressure at all. I'm
                        here whenever you're ready to explore your options. Have you had a chance to discuss the
                        situation with other family members or your attorney?
                      </p>

                      <p>
                        <strong>Value Add:</strong> I wanted to let you know that I've been monitoring the market in
                        your area, and I have some updated information that might be helpful for your decision-making
                        process.
                      </p>

                      <p>
                        <strong>Soft Close:</strong> Whether you decide to sell, rent, or keep the property, I'm here to
                        provide guidance. Is there anything specific you'd like to know about the current market
                        conditions or the probate process?
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="email-scripts" className="space-y-6 mt-6">
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-bold text-black mb-4 text-lg">Probate Email Templates</h4>
                    <div className="text-sm text-gray-700 space-y-6">
                      <div>
                        <p>
                          <strong>Subject:</strong> A Helping Hand During Challenging Times
                        </p>
                        <div className="bg-white p-4 rounded border mt-2">
                          <p>Dear [Recipient Name],</p>
                          <p>
                            The journey of grieving is deeply personal and uniquely individual. As you navigate the raw
                            emotions of your loss, I recognize that dealing with the intricacies of probate might seem
                            like a mountain to climb. Please know that I'm right here, willing and ready to stand beside
                            you every step of the way. My aim is to offer guidance, support, and expertise to help you
                            through the probate process, allowing you to focus your energies on healing and remembering
                            your loved one. You're not alone in this journey, and I'm #HereToHelp.
                          </p>
                          <p>
                            Warm regards,
                            <br />
                            [Your Name]
                          </p>
                        </div>
                      </div>

                      <div>
                        <p>
                          <strong>Subject:</strong> Offering You Peace of Mind in Difficult Moments
                        </p>
                        <div className="bg-white p-4 rounded border mt-2">
                          <p>Dear [Recipient Name],</p>
                          <p>
                            Experiencing the loss of a loved one is profound, and the added weight of understanding and
                            navigating the probate process can compound that grief. I want to assure you that, in these
                            trying times, I am here to simplify and guide you through every step. It is my foremost
                            priority to give you peace of mind and ensure that you feel supported. Remember, together,
                            we can find a way forward, and I'm dedicated to #SupportingYouInYourJourney.
                          </p>
                          <p>
                            With sincere empathy,
                            <br />
                            [Your Name]
                          </p>
                        </div>
                      </div>

                      <div>
                        <p>
                          <strong>Subject:</strong> Let Me Be Your Anchor
                        </p>
                        <div className="bg-white p-4 rounded border mt-2">
                          <p>Dear [Recipient Name],</p>
                          <p>
                            Life sometimes presents challenges when we least expect or are least prepared for them.
                            Grief, combined with the complexities of probate, can indeed be a daunting test of one's
                            strength. Please know that during this trying period, I want to be an anchor you can rely
                            on, ensuring you navigate each step of probate with clarity, confidence, and care. Lean on
                            me, for you have my steadfast support in these #ToughTimes.
                          </p>
                          <p>
                            Warmest regards,
                            <br />
                            [Your Name]
                          </p>
                        </div>
                      </div>

                      <div>
                        <p>
                          <strong>Subject:</strong> Navigating Grief and Probate Together
                        </p>
                        <div className="bg-white p-4 rounded border mt-2">
                          <p>Dear [Recipient Name],</p>
                          <p>
                            In times of grief, we often search for a beacon to light our path. While grief doesn't come
                            with a manual, neither does the probate process. But, during these delicate moments, I offer
                            you my expertise and empathy to guide and assist you. Let's navigate this journey together,
                            making sure you have all the information and support you need to move forward. Lean on me,
                            and together we'll find the path forward with #GuidanceThroughGrief.
                          </p>
                          <p>
                            Yours sincerely,
                            <br />
                            [Your Name]
                          </p>
                        </div>
                      </div>

                      <div>
                        <p>
                          <strong>Subject:</strong> Simplifying Probate for You
                        </p>
                        <div className="bg-white p-4 rounded border mt-2">
                          <p>Dear [Recipient Name],</p>
                          <p>
                            In the midst of profound loss, words might not always provide the solace we seek. But
                            actions can offer comfort. I understand the complexities of probate can be another layer of
                            stress during an already challenging time. I'm here to walk with you every step of the way,
                            aiming to simplify and streamline the process, ensuring you never feel overwhelmed.
                            Together, we'll navigate this journey, making it as smooth as possible. Always remember, I'm
                            here to help you #NavigateProbateWithCare.
                          </p>
                          <p>
                            Warmly,
                            <br />
                            [Your Name]
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="text-scripts" className="space-y-6 mt-6">
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h4 className="font-bold text-black mb-4 text-lg">Probate Text Templates</h4>
                    <div className="text-sm text-gray-700 space-y-4">
                      <div className="bg-white p-4 rounded border">
                        <p>
                          <strong>Personal Experience Text:</strong>
                        </p>
                        <p>
                          "Recently, I have had quite a few people close to me lose a loved one. I have watched them try
                          to grieve, while also trying to deal with managing the complexities that come with handling
                          their loved ones' estate. The amount of stress involved is insane. I wanted to help. I know I
                          can't take all the stress away, but one thing I can do is help folks navigate the probate
                          process. By handling that, it gave them more time to focus on what really matters; mourning.
                          If you or a loved one ever experience something similar, just know, I am here to help in any
                          way that I can."
                        </p>
                      </div>

                      <div className="bg-white p-4 rounded border">
                        <p>
                          <strong>Supportive Journey Text:</strong>
                        </p>
                        <p>
                          "🌼 Grieving is a journey, and during such times, navigating the intricacies of probate can
                          feel insurmountable. I'm here to stand beside you, offering guidance and support. Let me help
                          you through the probate process so you can focus on what truly matters. #HereToHelp"
                        </p>
                      </div>

                      <div className="bg-white p-4 rounded border">
                        <p>
                          <strong>Peace of Mind Text:</strong>
                        </p>
                        <p>
                          "🕊️ The loss of a loved one is profound, and the confusion of probate can compound that grief.
                          As you walk this emotional path, I'm here to assist and simplify the process for you. Your
                          peace of mind is my utmost priority. #SupportingYouInYourJourney"
                        </p>
                      </div>

                      <div className="bg-white p-4 rounded border">
                        <p>
                          <strong>Anchor Support Text:</strong>
                        </p>
                        <p>
                          "🌌 Life has a way of presenting challenges when we least expect it. Balancing grief with the
                          complexities of probate is a test of strength. Let me be your anchor and guide during this
                          difficult period, ensuring you navigate probate with clarity and confidence.
                          #YourSupportInToughTimes"
                        </p>
                      </div>

                      <div className="bg-white p-4 rounded border">
                        <p>
                          <strong>Guidance Through Grief Text:</strong>
                        </p>
                        <p>
                          "🍂 Grief doesn't come with a manual, and neither does probate. During this delicate time, I
                          am here to assist, offering expertise and empathy to guide you through the probate process.
                          Lean on me; together we'll find the way forward. #GuidanceThroughGrief"
                        </p>
                      </div>

                      <div className="bg-white p-4 rounded border">
                        <p>
                          <strong>Caring Navigation Text:</strong>
                        </p>
                        <p>
                          "💐 Words often fall short during moments of deep loss, but know that you're not alone in
                          navigating the complexities of probate. I am here to help every step of the way, aiming to
                          make the process as smooth as possible for you. #NavigatingProbateWithCare"
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="practice" className="space-y-6 mt-6">
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                      <h4 className="font-bold text-black mb-4 text-lg">Probate Roleplay Practice with AI</h4>
                      <p className="text-gray-700 mb-4">
                        Practice your probate scripts with our advanced voice AI. Focus on compassionate delivery,
                        active listening, and building trust during sensitive conversations.
                      </p>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <iframe
                        src="https://cerebras.vercel.app/"
                        width="100%"
                        height="700"
                        style={{ border: "none", borderRadius: "8px" }}
                        title="Cerebras Voice AI - Probate Roleplay Training"
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
              <CardDescription>Educational materials and nurturing campaigns for probate families</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h4 className="font-semibold text-black mb-4">Probate Marketing Materials</h4>
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <iframe
                    src="https://drive.google.com/embeddedfolderview?id=1Aa9mR9UEpFoAE-UfXAvDE9Kb23WLfklL#grid"
                    style={{ width: "100%", height: "600px", border: 0 }}
                    title="Probate Marketing Materials"
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
