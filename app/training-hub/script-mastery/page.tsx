"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BookOpen, Phone, Home, Users, MessageSquare, Play } from "lucide-react"

// Audio Player Component
function AudioPlayer({ src, title }: { src: string; title: string }) {
  return (
    <div className="bg-white p-4 rounded-md border border-gray-200 mb-4">
      <div className="flex items-center gap-3 mb-2">
        <Play className="h-4 w-4 text-blue-600" />
        <h4 className="font-medium text-sm text-gray-700">{title}</h4>
      </div>
      <audio controls className="w-full h-10" preload="metadata" style={{ maxWidth: "100%" }}>
        <source src={src} type="audio/mpeg" />
        <p className="text-sm text-gray-500">Your browser does not support the audio element.</p>
      </audio>
    </div>
  )
}

// FSBO Audio Section
function FSBOAudioSection() {
  return (
    <div className="mt-6 space-y-4">
      <h4 className="font-semibold text-lg mb-4">🎵 Audio Training Resources</h4>
      <AudioPlayer src="/audio/advanced-fsbo-follow-up.mp3" title="Advanced FSBO Follow-Up Training" />
      <AudioPlayer src="/audio/prospecting-fsbo-script.mp3" title="Prospecting FSBO Script Training" />
      <AudioPlayer src="/audio/fsbo-follow-up.mp3" title="FSBO Follow-Up Training" />
    </div>
  )
}

// Objections Audio Section
function ObjectionsAudioSection() {
  const objectionAudios = [
    {
      src: "/audio/always-get-the-listing-signed.mp3",
      title: "Always Get the Listing Signed",
    },
    {
      src: "/audio/overcoming-transaction-fee.mp3",
      title: "Overcoming Transaction Fee Objections",
    },
    {
      src: "/audio/another-agent-said-they-can-get-me-more-money.mp3",
      title: "Another Agent Said They Can Get Me More Money",
    },
    {
      src: "/audio/other-agents-will-cut-their-commission.mp3",
      title: "Other Agents Will Cut Their Commission",
    },
    {
      src: "/audio/what-are-you-going-to-do-differently.mp3",
      title: "What Are You Going to Do Differently?",
    },
    {
      src: "/audio/we-want-a-shorter-listing-timeframe.mp3",
      title: "We Want a Shorter Listing Timeframe",
    },
    {
      src: "/audio/we-want-to-interview-another-agent.mp3",
      title: "We Want to Interview Another Agent",
    },
    {
      src: "/audio/we-want-to-think-it-over.mp3",
      title: "We Want to Think It Over",
    },
    {
      src: "/audio/we-want-you-to-cut-your-commission.mp3",
      title: "We Want You to Cut Your Commission",
    },
    {
      src: "/audio/you-dont-handle-homes-in-my-price-range.mp3",
      title: "You Don't Handle Homes in My Price Range",
    },
    {
      src: "/audio/you-dont-have-any-listings-sales-in-my-area.mp3",
      title: "You Don't Have Any Listing Sales in My Area",
    },
  ]

  return (
    <div className="mt-6 space-y-4">
      <h4 className="font-semibold text-lg mb-4">🎵 Audio Training Resources</h4>
      <div className="grid gap-4">
        {objectionAudios.map((audio, index) => (
          <AudioPlayer key={index} src={audio.src} title={audio.title} />
        ))}
      </div>
    </div>
  )
}

export default function ScriptMasteryPage() {
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <BookOpen className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-black mb-4">Script Mastery</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master the art of conversation with our professionally crafted scripts for every real estate situation.
          </p>
        </div>

        {/* Script Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
          {scriptCategories.map((category) => (
            <Dialog key={category.id}>
              <DialogTrigger asChild>
                <Button
                  className="w-full h-32 flex flex-col items-center justify-center gap-3 rounded-xl text-white hover:opacity-90"
                  style={{
                    background: `linear-gradient(135deg, ${category.gradientFrom} 0%, ${category.gradientTo} 100%)`,
                  }}
                >
                  <category.icon className="h-8 w-8 text-white" />
                  <span className="text-lg font-medium text-white">{category.name}</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl flex items-center gap-2">
                    <category.icon className="h-6 w-6" />
                    {category.name}
                  </DialogTitle>
                  <DialogDescription>{category.description}</DialogDescription>
                </DialogHeader>
                <div className="mt-6">
                  <Tabs defaultValue={category.tabs[0].id}>
                    <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-6 text-xs">
                      {category.tabs.map((tab) => (
                        <TabsTrigger key={tab.id} value={tab.id} className="px-2">
                          {tab.name}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    {category.tabs.map((tab) => (
                      <TabsContent key={tab.id} value={tab.id}>
                        <div className="bg-gray-50 p-6 rounded-lg">
                          <h3 className="text-xl font-bold mb-4">{tab.name}</h3>
                          <p className="text-gray-600 mb-6">{tab.description}</p>

                          <Accordion type="single" collapsible className="w-full">
                            {tab.scripts.map((script, index) => (
                              <AccordionItem key={index} value={`script-${index}`}>
                                <AccordionTrigger className="text-left font-medium">{script.title}</AccordionTrigger>
                                <AccordionContent>
                                  <div className="bg-white p-4 rounded-md border border-gray-200">
                                    <div className="mb-4">
                                      <h4 className="font-semibold text-sm text-gray-500 mb-2">OBJECTIVE</h4>
                                      <p className="text-gray-700">{script.objective}</p>
                                    </div>

                                    <div className="mb-4">
                                      <h4 className="font-semibold text-sm text-gray-500 mb-2">SCRIPT</h4>
                                      <div className="bg-gray-50 p-4 rounded-md border border-gray-100 whitespace-pre-line">
                                        {script.content}
                                      </div>
                                    </div>

                                    {script.notes && (
                                      <div>
                                        <h4 className="font-semibold text-sm text-gray-500 mb-2">NOTES</h4>
                                        <p className="text-gray-700">{script.notes}</p>
                                      </div>
                                    )}
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            ))}
                          </Accordion>

                          {/* Audio Sections */}
                          {tab.id === "fsbo" && <FSBOAudioSection />}
                          {tab.id === "overcoming-objections" && <ObjectionsAudioSection />}
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        {/* Additional Content */}
        <div className="max-w-4xl mx-auto bg-gray-50 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">How to Use These Scripts Effectively</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Practice Makes Perfect</h3>
              <p>
                Rehearse these scripts until they feel natural. The goal isn't to sound robotic but to internalize the
                key points so you can deliver them conversationally.
              </p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Personalize Your Approach</h3>
              <p>
                Adapt these scripts to fit your personal style and the specific needs of your clients. Use them as a
                foundation, not a rigid template.
              </p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Listen More Than You Speak</h3>
              <p>
                The best scripts are interactive. Ask questions, listen carefully, and respond to what your clients are
                actually saying rather than just moving to the next line.
              </p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Track Your Results</h3>
              <p>
                Keep notes on which scripts and approaches work best for different situations. Continuously refine your
                delivery based on real-world feedback.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Script Data
const scriptCategories = [
  {
    id: "prospecting",
    name: "Prospecting Scripts",
    description: "Scripts for generating new leads and opportunities",
    icon: Phone,
    gradientFrom: "#4F46E5",
    gradientTo: "#7C3AED",
    tabs: [
      {
        id: "expired-listing",
        name: "Expired Listing",
        description: "Professional script for contacting owners of expired listings",
        scripts: [
          {
            title: "Expired Listing Phone Script - Complete System",
            objective:
              "To establish rapport with expired listing owners through systematic questioning and secure an appointment to interview for the listing",
            content: `(Mirror/Match Introduction) ... I'm ______ from (your brokerage name)... The reason I'm here (or calling) is your property came up on our computer as an expired listing and what I am curious about is ... when I can interview for the job of getting this property sold for you... You do still want to SELL YOUR PROPERTY right...

Let me ask you: (REMEMBER TO FIND WAYS TO CONNECT)

If you sold this property ... where would you go next. (_____) Wow! (Find a way to Connect)

How soon do you have to be there. (_____) Ouch!

What do you think stopped your property from selling. (_____) Really!

How did you happen to pick the last company that you listed with. (_____) Great!

What did that company do that you liked best. (_____) You're kidding!

What do you feel they should have done to get your property sold for you. (_____) OK

What will you expect from the next company that you choose. (_____) Terrific!

Have you already chosen a company to work with. (_____) Wonderful!

Let's do this... let me show you what your house is REALLY worth in today's market and ... show you the tools that only (your brokerage name) has ... that allow us to sell 20-30 homes a day which is more than any of our competitors. You do expect the best...right.

This way at least you REALLY ...know your options... and if it makes sense, it makes sense...if it doesn't, it doesn't.

The worst case scenario is...you'll know what your house is REALLY going to sell for... and that will be nice to know, right.

So... What would be the best time for me to come back with today's real value, show you how much money you would put in your pocket and interview for the job of selling your property.

Either you will like what I have to say and want to ... hire us ... or you won't want to... hire us ...and either one is fine.

What's better for you (_____) or (_____). Fantastic!!! See you then!

When can I take a look around to ensure that I fully understand your property so I can ...maximize your value... Now since I'm here...or ___ or ___ at ___.`,
            notes:
              "This script emphasizes building rapport through questions and positioning yourself as interviewing for the job. Fill in the blanks with specific times and personalize the company references as needed.",
          },
          {
            title: "Expired Listing Email Campaign Series (5 Emails)",
            objective: "Professional email sequence to nurture expired listing sellers with empathetic messaging",
            content: `EMAIL 1: Let's Turn a New Page for Your [Address] Property!
Subject: Let's Turn a New Page for Your [Address] Property!

Hi [Homeowner's Name],
I noticed that your listing at [Address] recently expired, and I understand this might be a bit discouraging. I'm [Your Name] with [Your Realty Company], and I specialize in revitalizing listings like yours. My approach is tailored to each property, focusing on targeted marketing and pricing strategies that resonate with today's buyers.

Would you be open to discussing a fresh approach for your property? I'd love to share some success stories and ideas specific to homes in [Area/Neighborhood].

Best regards,
[Your Name]

EMAIL 2: It's Time for a New Strategy for Your Home on [Street Name]
Subject: [Homeowner's Name], It's Time for a New Strategy for Your Home on [Street Name]

Dear [Homeowner's Name],
Seeing your home on [Street Name] leave the market unsold can be frustrating, but it's often just a matter of strategy. I'm [Your Name] from [Your Realty Company], and I have a track record of successfully selling properties that had previously struggled to find the right buyer.

I'd like to offer you a no-obligation assessment of your home, providing insights into the current market and how we can position your property for a successful sale.

Looking forward to hearing from you,
[Your Name]

EMAIL 3: New Possibilities Await Your Home at [Address]
Subject: New Possibilities Await Your Home at [Address]

Hello [Homeowner's Name],
I'm [Your Name], a real estate professional with [Your Realty Company]. I noticed that your property at [Address] is no longer listed. In today's dynamic market, repositioning and an innovative marketing approach can make all the difference.

I have specific ideas for your property, including a comprehensive digital marketing strategy and staging techniques that can enhance its appeal. Let's discuss how we can unlock the full potential of your home.

Warm regards,
[Your Name]

EMAIL 4: Explore a Fresh Approach to Selling Your [Area] Home
Subject: [Homeowner's Name], Explore a Fresh Approach to Selling Your [Area] Home

Greetings [Homeowner's Name],
I'm [Your Name] with [Your Realty Company], and I specialize in properties in the [Area] region. It's not uncommon for listings to expire in this complex market, but with a fresh perspective and a customized marketing plan, success is within reach.

I'd love to connect and discuss a tailored strategy that aligns with your goals and showcases your property's unique features to the right audience.

Best wishes,
[Your Name]

EMAIL 5: Revitalize Your Listing at [Address] with Proven Strategies
Subject: Revitalize Your Listing at [Address] with Proven Strategies

Hi [Homeowner's Name],
I'm [Your Name] from [Your Realty Company], reaching out regarding your property at [Address]. Sometimes, a fresh set of eyes and a new marketing approach are what's needed to sell a home. With my experience in [Area], I bring proven strategies that have helped similar homes sell quickly and at desirable prices.

Let's schedule a time to review what didn't work in the past and how we can turn things around for your property.

Regards,
[Your Name]`,
            notes:
              "Send these emails 3-5 days apart. Personalize with actual area names and specific market data when possible. Focus on empathy and fresh solutions.",
          },
          {
            title: "Expired Listing SMS Campaign Series (5 Messages)",
            objective: "Concise text message sequence for mobile-first expired listing outreach",
            content: `SMS 1: Friendly Introduction & Value Offer
"Hi [Homeowner's Name], I'm [Your Name] with [Your Realty Company]. I noticed your listing on [Street Name] recently expired. I have some unique strategies that might help in this challenging market. Can we chat about this?"

SMS 2: Empathetic Approach & Expertise Highlight
"Hello [Homeowner's Name], it's [Your Name] from [Your Realty Company]. Selling a home can be tough, especially in today's market. I've successfully helped homes like yours sell quickly and for a great price. Let's talk about how I can do the same for you."

SMS 3: Market Insight & Consultation Offer
"Good morning [Homeowner's Name], I'm [Your Name] with [Your Realty Company]. I specialize in properties in [Area Name] and have insights into why some listings don't close. Would you be open to a brief call to discuss your home's potential?"

SMS 4: Personalized Strategy & Success Record
"Hi [Homeowner's Name], this is [Your Name] from [Your Realty Company]. I've had success in re-listing properties like yours in [Neighborhood/Area]. I have a tailored strategy ready for your home. Are you available for a quick call to explore this?"

SMS 5: Direct & Solution-Oriented
"Hey [Homeowner's Name], I'm [Your Name] from [Your Realty Company]. Saw your listing on [Street Name] expired. I have a few ideas that could turn things around and get your house sold. Interested in hearing more?"`,
            notes:
              "Send SMS messages 2-3 days apart. Keep messages professional but friendly. Always offer specific value and avoid being pushy.",
          },
        ],
      },
      {
        id: "fsbo",
        name: "FSBO",
        description: "Scripts for For Sale By Owner prospects",
        scripts: [
          {
            title: "FSBO Door Knock Script - Complete System",
            objective:
              "To establish rapport with FSBO sellers through systematic questioning and secure an appointment using a proven 15-step process",
            content: `____, I'm here about the home for sale... is it still available... ____ Great!

I'm ______ with (insert brokerage name), and I know you are going to try it on your own for a little while, and I'm here to interview for the job when you are ready.....and that's why ... I'm curious...

1. If you sold this home ... where would you go next. __________ Great!

2. How soon do you have to be there. _________________ No Problem!

3. How long have you been trying to ... sell your property... on your own. ____ Wow!

4. How would you rate your motivation to ... move ... on a scale of 1 to 10. ______ Great!

5. If we were able to ... sell your home... in the next 30 days would that be OK. ___

6. What methods are you using for marketing your home. _____Interesting!

7. How did you determine your sales price. ________________ OK!

8. Are you prepared to ... adjust your price down...when working with a buyer. __ Great!

9. Why did you decide to sell yourself...rather than to ...hire the best ...Real Estate company. ________________Understandable!

10. If you were to ... hire the best Company...what would you expect us to do ... to ...get your property sold... for you. ______________ Excellent!

11. When do you think you will at least ... interview (your brokerage name)... for the job of selling your home. _____________ Wonderful!

12. What would have to happen .... to cause you to ... make the decision ...to ... HIRE THE BEST COMPANY ... (your brokerage name)...for the job of selling your property. ___ OK!

13. Let's do this... let me ... show you what your house is REALLY worth in today's market and show you the tools that only (your brokerage name) has that allow us to sell 20-30 homes a day which is more than any of our competitors.... You do... expect the best ...don't you.... Of course!

14. This way... at least you REALLY ... know your options... and if ...it makes sense...it makes sense... if it doesn't it doesn't... either way ... let's ... find out... The worst case scenario is...you'll know what your house is REALLY going to sell for... that will be nice to know.. RIGHT!

15. What would be the best time for me to come back by with today's real value, show you how much you would put in your pocket and interview for the job of selling your property? Either you will like what I have to say and want to ...hire us... or you won't want to ...hire us...and either one is fine....

What's better for you ___ or ____ Fantastic!!! See you then!

When can I take a look at the property to ensure that I fully maximize the value? ____ or ____ or right now?`,
            notes:
              "This comprehensive 15-step system builds rapport systematically. Practice the flow and timing between questions. Each question serves a specific purpose in uncovering motivation and building trust. Audio training files provide real-world examples of this script in action.",
          },
          {
            title: "FSBO Email Campaign Series (5 Emails)",
            objective: "Professional email sequence to nurture FSBO sellers with value-focused messaging",
            content: `EMAIL 1: Introduction and Value Proposition
Subject: Local Expertise to Maximize Your FSBO Success

Hello [Seller's Name],
As a dedicated local real estate agent, I've noticed your property on the FSBO listings. My expertise in [Your Area] real estate market positions me uniquely to assist you. While you're embarking on a FSBO journey, partnering with a professional can significantly enhance your success.

My goal is to ensure your property sells for its highest potential value. This not only benefits you but also positively impacts my other clients by establishing higher market values in our community. Let's chat about how we can achieve the best outcome for your sale.

Best regards,
[Your Name]

EMAIL 2: Highlighting Local Market Knowledge
Subject: Leverage My Local Market Insights for Your FSBO Sale

Hi [Seller's Name],
I'm [Your Name], a real estate expert in [Your Area], and I've been following your FSBO listing. My deep understanding of our local market can be a vital asset in your home selling process.

Selling at an optimal price point benefits not only you but also helps in maintaining robust property values for the entire neighborhood – something all my clients, present and future, greatly appreciate. Let's discuss how we can collaborate to maximize your sale price.

Warm regards,
[Your Name]

EMAIL 3: Focusing on Mutual Benefits
Subject: Achieving Top Dollar for Your Home Benefits Us Both

Dear [Seller's Name],
I'm reaching out as a seasoned real estate professional in [Your Area]. I see you're selling your home independently, and I admire your initiative. As someone deeply invested in the local property market, I understand how important it is for homes like yours to sell for their true worth.

Achieving a successful sale at a great price not only fulfills your goals but also elevates the market, benefiting my other clients. I'd love to explore how we can work together for mutual success.

Best,
[Your Name]

EMAIL 4: Offering Support and Guidance
Subject: Expert Guidance to Enhance Your FSBO Journey

Hello [Seller's Name],
As a real estate agent specializing in [Your Area], I noticed your FSBO listing and wanted to offer my expertise. Navigating the FSBO route can be challenging, but with the right guidance, it's incredibly rewarding.

By ensuring your home sells for the best possible price, we not only achieve your goal but also support the overall health of our local real estate market, benefiting all homeowners in the area. Let's talk about how we can make your sale a resounding success.

Regards,
[Your Name]

EMAIL 5: Emphasizing Community Impact
Subject: Your FSBO Success Contributes to Our Community's Value

Hi [Seller's Name],
I'm [Your Name], a local real estate agent, and I noticed your home listed as FSBO. Selling your home at a peak value is crucial for you and has a ripple effect throughout our community.

By achieving the best possible sale price, we elevate the market standards, benefiting all property owners in the area, including my clients. I'd be thrilled to discuss how we can collaborate to maximize your home's value and positively impact our community.

Sincerely,
[Your Name]`,
            notes:
              "Send these emails 3-5 days apart. Personalize with actual area names and specific market data when possible.",
          },
          {
            title: "FSBO SMS Campaign Series (5 Messages)",
            objective: "Concise text message sequence for mobile-first FSBO outreach",
            content: `SMS 1: Introduction and Value Proposition
"Hi [Seller's Name], I'm [Your Name], a local real estate expert. Noticed your FSBO listing. I can help maximize your sale price, benefiting you and our community. Let's talk! - [Your Name]"

SMS 2: Highlighting Local Market Knowledge
"Hello [Seller's Name], I'm [Your Name], specializing in [Your Area] real estate. Let's use my market insights to boost your FSBO sale and strengthen local property values. Interested? - [Your Name]"

SMS 3: Focusing on Mutual Benefits
"Hi [Seller's Name], I'm [Your Name], a real estate pro in [Your Area]. Your successful FSBO sale can elevate the market for all. Let's work together for top dollar! - [Your Name]"

SMS 4: Offering Support and Guidance
"Hey [Seller's Name], [Your Name] here, a real estate agent in [Your Area]. I can guide your FSBO journey for a rewarding sale, benefiting our local market. Let's connect! - [Your Name]"

SMS 5: Emphasizing Community Impact
"Hello [Seller's Name], I'm [Your Name] from [Your Area] real estate. Your FSBO success can uplift our community's property values. Let's collaborate for a great sale! - [Your Name]"`,
            notes:
              "Send SMS messages 2-3 days apart. Keep messages under 160 characters when possible. Always include your name for identification.",
          },
        ],
      },
      {
        id: "absentee-owners",
        name: "Absentee Owners",
        description: "Scripts for out-of-area property owners",
        scripts: [
          {
            title: "Absentee Owner Phone Script - Value-First Approach",
            objective:
              "To establish rapport with out-of-area property owners by offering local assistance and building trust before discussing potential sale opportunities",
            content: `Mirror and Match greeting. ____ (Repeat back their greeting exactly - match their Energy / tonality / vocabulary)

It's ______ (Your name) with (Insert brokerage name) here in _________(area)

I'm reaching out about the property that you own on ___________. (Ex. Oak Street)

I live and work right here in ______ (area) and I'm checking on my out-of-area owners to see if there's anything I can do to bring some value to you since I'm here and it's sometimes difficult for you to check on your investment.

I don't want anything at all from you...just here to help out like I would hope someone would do for me if I lived away from my investment... for some I've been doing a drive by to check on things and take some pics...

for others .... I've been doing a FaceTime /duo/skype walk around with them....

for others I am connecting them with some handymen, contractors, .etc...

for others...I'm emailing them values occasionally so they know what it's worth... . so..I'm curious ....what can I do to help you...

If something.. ______ - Great I'm happy to help... I'm on it...

If nothing..... Ok no problem, just know I'm right here if you need anything...this is my cell number so please ...save it now... as _(your name) ____real estate friend___(area) (ex. Jeff Beggins Real Estate Friend Orlando). ....if you ever need anything locally just ...reach out to me...anytime... and let's connect when you are in town...

Well, thanks for your time, great talking with you. I'll reach out from time to time to check on you, feel free to do the same.`,
            notes:
              "This script focuses on providing value first without asking for anything. The key is to establish yourself as a local resource and build trust over time. Follow up consistently with helpful information and services.",
          },
          {
            title: "Absentee Owner Email Campaign Series (5 Emails)",
            objective: "Professional email sequence targeting Florida absentee owners affected by rising costs",
            content: `EMAIL 1: Evaluating Financial Impact
Subject: Navigating Recent Changes in Florida Property Costs

Dear [Owner's Name],
Florida's real estate landscape has experienced some noteworthy changes recently, especially regarding insurance and property taxes. As an absentee owner, these shifts could have a substantial effect on your investment.

If you're reconsidering the financial feasibility of holding onto your property, I specialize in helping owners like you assess and maximize its current value.

Reach out for a no-obligation discussion on how we can optimize your investment.

Warm Regards,
[Your Name]

EMAIL 2: Time-sensitive Alert
Subject: Important Update: Florida Insurance & Property Taxes

Hello [Owner's Name],
Recent hikes in insurance and property taxes in Florida have left many absentee owners re-evaluating their position. With these increases, is your property still the investment you envisioned?

Should you feel the financials no longer make sense, my expertise lies in helping absentee owners like you navigate this terrain and maximize your property's value.

Don't hesitate to contact me for insights tailored to your unique situation.

Best,
[Your Name]

EMAIL 3: Offering Solutions
Subject: Is Your Florida Property Still Working for You?

Hi [Owner's Name],
With Florida's recent upticks in insurance and property taxes, many absentee owners are grappling with the effects on their bottom line. Is your property still yielding the returns you expect?

I have successfully guided many in your position, helping them pivot strategies and unlock their property's true potential. If the numbers aren't adding up for you, let's talk solutions.

Warmly,
[Your Name]

EMAIL 4: The Consultative Approach
Subject: Let's Review Your Florida Property's Financial Health

Dear [Owner's Name],
The recent changes in insurance and property taxes in Florida have prompted many absentee owners to take a closer look at their investments. I offer a comprehensive review to help you determine if your property is still aligned with your financial aspirations.

If the rising costs have you second-guessing, allow me to help you understand your options and maximize its current value.

Looking forward to assisting you,
[Your Name]

EMAIL 5: Positioning for the Future
Subject: Maximizing Your Florida Property in Today's Market

Hello [Owner's Name],
Changes are afoot in Florida's property sector, particularly with the latest surge in insurance and property taxes. As an absentee owner, it's crucial to assess how these shifts impact your long-term plans.

My specialty is in assisting owners like you navigate these waters, ensuring you're poised for success irrespective of market dynamics. Let's strategize together to ensure your property continues to be a valuable asset.

Best wishes,
[Your Name]`,
            notes:
              "These emails specifically address Florida's insurance and tax challenges. Customize with local market data and send 4-5 days apart for maximum impact.",
          },
          {
            title: "Absentee Owner SMS Campaign Series (5 Messages)",
            objective: "Concise text message sequence for mobile-first absentee owner outreach",
            content: `SMS 1: Investment Partnership
"Hi [Owner's Name], I noticed you own a property in Florida but aren't currently residing there. Many owners in your position have partnered with us to maximize their investment returns. Curious to learn more?"

SMS 2: Market Opportunity
"Hey [Owner's Name]! Florida's real estate market has seen some interesting shifts. Being an absentee owner, have you considered your property's current potential? Let's chat."

SMS 3: Sunshine State Focus
"☀️ Greetings, [Owner's Name]! Sunshine State properties are in demand. As you own a property in Florida but aren't local, we can help assess its value and opportunities. Interested?"

SMS 4: Management Support
"Hi [Owner's Name], managing a property from afar can be challenging. We've assisted many absentee owners in Florida, ensuring their homes are well-maintained and profitable. Fancy a chat?"

SMS 5: Local Expertise
"Hello [Owner's Name]! Owning a property in beautiful Florida is a dream for many. If you ever think of selling or need local insights, let's connect. We specialize in supporting absentee owners like you."`,
            notes:
              "Send SMS messages 2-3 days apart. Keep messages friendly and helpful rather than pushy. Always offer value and local expertise.",
          },
        ],
      },
      {
        id: "farming",
        name: "Farming",
        description: "Scripts for geographic farming",
        scripts: [
          {
            title: "Property Wizard Farming Script",
            objective:
              "To deliver neighborhood updates while identifying potential sellers and securing listing appointments",
            content: `___(Mirror/Match Introduction)..... I'm (_____) with CENTURY 21. I am delivering the latest edition of the Property Wizard to keep you informed on Real estate activity in OUR neighborhood. (There is a new listing /a recent sale/an open house/etc. (Find something of interest to discuss with them)

I'm curious. Who do you know that might be interested in moving into OUR area?

The _(area)_ market is heating up, we are selling about 20-30 houses a day as a company, mortgage rates are low and the inventory VERY limited so it's a great time to move up, move down or just move around town.

So I was wondering:
• When do you plan on moving? (_____) Terrific!
• How long have you lived at this address? (_____) Great!
• Where did you move from? (_____) Good for You!
• How did you happen to pick this area? (_____) Excellent! / Ouch!

I know you said you weren't going to move but I'm curious. If you were to move (hypothetically) where would you go next? (_____) And when would that be ("Hypothetically")? (_____) Fantastic!

***KEEP ASKING UNTIL YOU GET AN ANSWER!!!!!***

(Bigger house/Smaller House/ Condo/ In Florida/ Out of State/etc.)

You're probably curious as to what your property is REALLY worth in today's rising market, aren't you. ****(If they are curious- continue)**** (If not leave them with positive impression)

Let's do this let me show you what your house is REALLY worth in today's market and show you the tools that only CENTURY 21 has that allow us to sell 20-30 homes a day which is more than any of our competitors. You do expect the best don't you. (_____). Of course!

This way at least you REALLY... know your options and if ... it makes sense... it makes sense. If it doesn't... it doesn't. Either way let's find out.

The worst case scenario is you'll know what your house is REALLY going to sell for. That will be nice to know. (_____) RIGHT!

So what would be the best time for me to come back by with today's real value, show you how much you would put in your pocket and interview for the job of selling your property.

Either you will like what I have to say and want to... hire us ... or you won't want to... hire us ... and either one is fine. What's better for you (_____) or (_____) Fantastic!!!

In order to maximize the value for you and do the best job when would be a good time for me to take a look at your home. NOW ... since I'm here or (_____) or (_____) at (_____). Great.

(Get Phone # and Email address)`,
            notes:
              "This script uses the Property Wizard newsletter as a door opener. The key is to keep asking questions until you get engagement. Always have current neighborhood statistics and recent sales data ready to discuss. Remember to collect contact information for follow-up.",
          },
        ],
      },
      {
        id: "soi",
        name: "SOI",
        description: "Scripts for your Sphere of Influence",
        scripts: [
          {
            title: "SOI Follow-Up Script",
            objective:
              "To systematically ask your sphere of influence for referrals and secure contact information for potential leads",
            content: `(Mirror/Match Introduction)______, its _______ This is a business call, do you have a quick minute for me? (_____)Wonderful! (We can catch up on personal stuff later.)

As you know I'm with CENTURY 21. We are the #1 CENTURY 21 company in the entire State and we are really proud of that, and Real Estate is Awesome right now and I have set REALLY HIGH GOALS for myself this year, and I really could use your help...

Who do you know that is thinking about SELLING or BUYING Real Estate in the next 30/60/90 days. (_____)Great!

(Chunk Down if they can't think of anyone)
Ok, who can you think of in your (office, church group, family, neighborhood) that may be thinking about moving soon.
(Who do you know that is getting married, divorced, having a baby, getting a promotion, retiring, etc.)

(If they give you a name)
Great! What's their name? (_____)
What's their phone number? (_____)
What's their email address? (_____)
What's their address? (_____)
What's their situation? (_____)
How do you know them? (_____)
How long have you known them? (_____)
When do you think they will move? (_____)
Do you think they would mind if I called them? (_____)
What should I tell them when I call? (_____)
Can I use your name? (_____)

(If they don't give you a name)
OK, no problem. I know you will keep your eyes and ears open for me and if you hear of anyone please give me a call. I really appreciate it.

By the way, I have a great referral program. If you refer someone to me and I help them buy or sell a house, I will give you $_____ as a thank you. Does that sound fair? (_____)Great!

Also, I want to keep you informed about what's happening in the Real Estate market. Can I add you to my monthly newsletter? (_____)Terrific!

What's the best email address for you? (_____)
And what's your cell phone number? (_____)

Thanks so much for your help. I really appreciate it. Let's get together soon to catch up. Have a great day!`,
            notes:
              "This script is designed to be systematic and thorough. The key is to ask specific questions to get detailed information about potential referrals. Always offer something in return (referral fee, market updates) to maintain the relationship.",
          },
        ],
      },
      {
        id: "overcoming-objections",
        name: "Overcoming Objections",
        description: "Scripts for handling common objections",
        scripts: [
          {
            title: "We Want to Think It Over",
            objective: "To uncover the real objection behind 'thinking it over' and move toward a decision",
            content: `I understand you want to think it over. That tells me one of three things:

1. I haven't given you enough information for you to make a decision
2. I haven't answered all of your questions or concerns
3. I haven't shown you the value in what I'm offering

Which one is it?

(Wait for their response)

Let me ask you this - what specifically do you need to think over? Is it:
- The commission structure?
- My marketing plan?
- The timing?
- Something else?

(Address their specific concern)

You know, in my experience, when people say they want to think it over, they usually have a specific concern. What's yours?

(Listen and address)

Here's what I've learned - the best decisions are made when you have all the information. What additional information do you need from me to make a confident decision today?`,
            notes:
              "The key is to not accept 'think it over' as a final answer. Dig deeper to find the real objection and address it directly.",
          },
          {
            title: "We Want You to Cut Your Commission",
            objective: "To defend your commission while demonstrating value and maintaining the listing opportunity",
            content: `I understand you're concerned about the commission. Let me ask you this - when you're looking for a doctor, do you look for the cheapest one, or do you look for the best one?

(Wait for response)

The same principle applies to real estate. You're not just paying for someone to put a sign in your yard. You're paying for:

- Professional marketing that reaches thousands of potential buyers
- Expert negotiation that could save or make you thousands
- A proven system that sells homes faster and for more money
- Full-time dedication to your sale
- Professional photography, staging advice, and market positioning

Let me show you something. If I can sell your home for just 3% more than another agent, that more than pays for the difference in commission. And based on my track record, I typically sell homes for 5-8% more than the average agent.

Would you rather save $1,000 on commission and lose $10,000 on the sale price?

Here's what I can do - I can guarantee my marketing plan and if your home doesn't sell in 90 days, you can cancel the listing with no penalty. Fair enough?`,
            notes:
              "Focus on value, not price. Use analogies they can relate to and provide concrete examples of your superior results.",
          },
          {
            title: "Another Agent Said They Can Get Me More Money",
            objective:
              "To differentiate your approach and demonstrate why you're the better choice despite pricing claims",
            content: `That's interesting. Can I ask you what they based that number on?

(Listen to their response)

You know, any agent can throw out a high number to get your listing. The question is - can they actually deliver on that promise?

Let me ask you this - would you rather have an agent who:
A) Promises you $500,000 but your house sits on the market for 6 months and eventually sells for $450,000, or
B) An agent who prices it correctly at $475,000 and sells it in 30 days?

Which scenario puts more money in your pocket faster?

Here's what I've learned in [X] years of selling real estate - overpricing a home actually costs sellers money because:
1. You miss the most active buyer pool in the first 30 days
2. Your home becomes stale on the market
3. You end up reducing the price multiple times
4. You sell for less than if you had priced it correctly from the start

I base my pricing on actual market data, not wishful thinking. Let me show you the comparable sales that support my recommended price...

(Show CMAs and market data)

The other agent is making you a promise they can't keep. I'm giving you a strategy that works.`,
            notes:
              "Use logic and market data to counter emotional pricing promises. Focus on net proceeds and time on market, not just list price.",
          },
          {
            title: "We Want to Interview Another Agent",
            objective: "To secure the listing now while addressing their desire to shop around",
            content: `I completely understand wanting to make sure you're making the right choice. This is probably the largest financial transaction you'll make this year, so you want to be confident.

Can I ask you what specific questions or concerns you have that you'd like another agent to address?

(Listen and address their concerns)

Here's what I've learned - most people who interview multiple agents end up more confused, not less. Every agent will tell you they're the best, show you different numbers, and make different promises.

Instead of adding to the confusion, let me make this simple for you:

I'm so confident in my ability to sell your home that I'll make you this guarantee:
- If your home doesn't sell in 90 days, you can cancel the listing
- If you're not completely satisfied with my marketing and communication, you can cancel
- If I don't deliver on everything I've promised today, you can fire me

What other agent is willing to put their money where their mouth is like that?

You've already spent time with me, you like my marketing plan, and you feel comfortable with my approach. Why start over with someone else when you've already found the right agent?

The market is moving fast right now. Every day we wait is a day we're not marketing your home to potential buyers. Let's get started today so we can get your home sold.`,
            notes:
              "Acknowledge their desire to shop while demonstrating confidence through guarantees. Create urgency around market timing.",
          },
          {
            title: "You Don't Have Any Listings/Sales in My Area",
            objective:
              "To overcome geographic objections by demonstrating broader market knowledge and transferable skills",
            content: `That's actually a great question, and I'm glad you brought it up.

You're right - I haven't sold a lot of homes on your specific street. But let me ask you this - would you rather have an agent who:

A) Has sold 3 homes on your street but only sells 10 homes per year total, or
B) An agent who sells 50+ homes per year across the market and understands pricing, marketing, and negotiation at the highest level?

Here's what I bring to your sale that's more valuable than just local sales:
- I understand buyer behavior across the entire market
- I have a database of buyers looking in multiple areas, including yours
- My marketing reaches buyers from everywhere, not just your neighborhood
- I have proven systems that work in any location

Plus, I've done extensive research on your area. Let me show you...
(Present market analysis and comparable sales data)

The truth is, real estate principles are the same everywhere - it's about pricing, marketing, and negotiation. And I'm the best at all three.

In fact, being new to your area might be an advantage. I'll work twice as hard to prove myself, and I won't have any preconceived notions about what your home should sell for.

What matters most - that I've sold homes on your street before, or that I can get your home sold quickly and for top dollar?`,
            notes:
              "Turn the objection into an advantage by focusing on overall expertise and fresh perspective. Always have market data ready for any area you're working.",
          },
          {
            title: "You Don't Handle Homes in My Price Range",
            objective:
              "To overcome price range objections by demonstrating universal skills and commitment to excellence",
            content: `I appreciate you bringing that up. Can I ask what gave you that impression?

(Listen to their response)

You know, I've found that the skills needed to sell a home successfully are the same regardless of price point:
- Professional marketing and presentation
- Accurate pricing based on market data
- Expert negotiation
- Strong communication and follow-through

Whether I'm selling a $200,000 home or a $2,000,000 home, my clients get the same level of service and expertise.

In fact, let me share something with you - some of my most successful sales have been outside my typical price range because I worked extra hard to prove myself.

Here's what I can promise you:
- I'll treat your home sale as if it's the most important transaction I've ever handled
- I'll invest in professional marketing regardless of the price point
- I'll be available to you 7 days a week
- I'll negotiate as aggressively for you as I would for any client

The question isn't whether I've sold homes in your exact price range - it's whether I have the skills, dedication, and systems to get your home sold.

And I do.

What's most important to you in an agent - that they've sold homes in your price range before, or that they'll work harder than anyone else to get your home sold?`,
            notes:
              "Focus on transferable skills and extra effort rather than past experience. Demonstrate commitment to treating every client equally regardless of price point.",
          },
          {
            title: "We Want a Shorter Listing Timeframe",
            objective: "To secure a standard listing period while addressing their concerns about commitment",
            content: `I understand your concern about the listing timeframe. Can I ask what's driving that request?

(Listen to their response)

I appreciate that you want flexibility, but let me explain why a 6-month listing period actually protects you:

First, it typically takes 30-45 days to properly market a home and find the right buyer. If we only have 60-90 days, we're under pressure to reduce the price quickly rather than wait for the right buyer.

Second, buyers and other agents take listings more seriously when they know the agent has time to properly market the property. A short listing period can actually signal desperation.

But here's what I can do for you - even though I'm asking for 6 months, I'll give you these guarantees:

- If you're not happy with my marketing or communication at any point, you can cancel
- If your home doesn't sell in 90 days, we'll sit down and reevaluate our strategy
- If I'm not performing to your expectations, you can fire me

The listing period protects both of us, but my performance guarantees protect you.

Think of it this way - you're not committing to 6 months of being stuck with me. You're giving me 6 months to prove I'm the best agent you've ever worked with.

Fair enough?`,
            notes:
              "Explain the business reasons for standard listing periods while offering performance guarantees to address their concerns about being stuck.",
          },
          {
            title: "What Are You Going to Do Differently?",
            objective: "To differentiate your approach from their previous agent and demonstrate superior value",
            content: `That's an excellent question, and I'm glad you asked because it shows you're thinking strategically about this decision.

First, let me ask - what did your previous agent do that you felt didn't work?

(Listen and take notes)

Based on what you've told me, here's specifically what I'll do differently:

1. **Communication**: I'll provide weekly updates every Friday, whether there's news or not. You'll never wonder what's happening with your listing.

2. **Marketing**: Let me show you my 27-point marketing plan... (show marketing materials)
   - Professional photography within 48 hours
   - Listing on 200+ websites
   - Social media marketing to 5,000+ followers
   - Email marketing to my database of buyers

3. **Pricing Strategy**: I'll provide a detailed market analysis every 30 days and recommend adjustments based on market feedback, not just hope for the best.

4. **Showing Feedback**: I'll personally call every agent who shows your home to get detailed feedback and share it with you within 24 hours.

5. **Buyer Follow-up**: I'll personally follow up with every potential buyer to gauge their interest level.

The biggest difference is this - I treat every listing like it's my own home. Your success is my success.

Most agents list your home and hope it sells. I actively sell your home.

Does that address your concerns about doing things differently?`,
            notes:
              "Be specific about your differentiators and always relate back to their previous negative experience. Show, don't just tell.",
          },
          {
            title: "Other Agents Will Cut Their Commission",
            objective: "To maintain commission integrity while demonstrating superior value proposition",
            content: `I understand other agents have offered to cut their commission. Let me ask you this - if you needed surgery, would you choose the cheapest surgeon or the best surgeon?

(Wait for response)

Here's what I've learned about agents who cut their commission - they have to cut something else too. Usually it's:
- Marketing budget (cheaper photos, less advertising)
- Time and attention (they need more clients to make the same income)
- Support staff (they can't afford assistants to help serve you)
- Experience (newer agents often cut commissions to get business)

Let me show you the difference in results:
- Average agent sells homes for 94% of list price
- I sell homes for 98% of list price
- Average time on market: 67 days
- My average time on market: 32 days

If I can sell your $400,000 home for just 2% more than another agent, that's $8,000 more in your pocket. Even after paying my full commission, you're still ahead by thousands.

Plus, I offer services that discount agents simply can't afford:
- Professional staging consultation
- Professional photography and virtual tours
- Dedicated marketing coordinator
- 24/7 availability

You're not paying for commission - you're investing in results.

Would you rather save $2,000 on commission and lose $8,000 on the sale price, or pay full commission and net thousands more?

The choice is yours, but I think the math is pretty clear.`,
            notes:
              "Use concrete numbers and analogies to demonstrate value. Focus on net proceeds, not gross commission savings.",
          },
        ],
      },
    ],
  },
  {
    id: "listing",
    name: "Listing Scripts",
    description: "Scripts for listing appointments and presentations",
    icon: Home,
    gradientFrom: "#059669",
    gradientTo: "#10B981",
    tabs: [
      {
        id: "listing-presentation",
        name: "Listing Presentation",
        description: "Complete listing presentation scripts",
        scripts: [
          {
            title: "Complete Listing Presentation Script",
            objective:
              "To secure a listing agreement through a systematic presentation that builds value and addresses concerns",
            content: `OPENING:
Thank you for inviting me to your home today. I know you have choices when it comes to selecting a real estate agent, and I don't take that lightly.

Before we begin, I want to understand your situation better. Can you tell me:
- What's motivating you to sell?
- What's your ideal timeline?
- Where are you planning to move?
- Have you spoken with any other agents?

MARKET ANALYSIS:
Based on my research, here's what's happening in your market... (Present CMA)

Your home is worth between $X and $Y based on recent comparable sales. Here's how I arrived at that number... (Show comps)

MARKETING PLAN:
Here's how I'll market your home to get maximum exposure:
1. Professional photography within 48 hours
2. MLS listing with detailed description
3. Syndication to 200+ websites
4. Social media marketing
5. Email marketing to my buyer database
6. Open houses and private showings
7. Agent networking and caravan

TRACK RECORD:
Let me share my results:
- Average days on market: 32 (vs. market average of 67)
- Average sale price: 98% of list price
- Homes sold last year: [X]
- Client satisfaction rating: 98%

COMMISSION DISCUSSION:
My commission is X%. Here's what that includes:
- All marketing expenses
- Professional photography
- Dedicated support team
- 24/7 availability
- Guaranteed communication

CLOSING:
Based on everything we've discussed, I believe I'm the right agent to sell your home. Are you ready to move forward today?

(Handle any objections)

Great! Let's get the paperwork completed so we can start marketing your home immediately.`,
            notes:
              "This is a complete listing presentation framework. Customize with your specific market data, track record, and marketing materials. Practice the flow until it feels natural.",
          },
        ],
      },
      {
        id: "pricing-discussions",
        name: "Pricing Discussions",
        description: "Scripts for pricing conversations",
        scripts: [
          {
            title: "Overpriced Listing Discussion",
            objective: "To guide sellers to realistic pricing while maintaining the listing opportunity",
            content: `I understand you'd like to list at $X, and I want to make sure we price your home for success.

Let me show you what happens when homes are overpriced:
- They sit on the market longer
- They become stale and stigmatized
- They eventually sell for less than if priced correctly initially
- You lose the most active buyer pool in the first 30 days

Here's the data on your specific market... (Show pricing statistics)

I have three pricing strategies we can consider:

1. **Aggressive Pricing**: List at $X (market value) to generate immediate activity and potentially multiple offers

2. **Market Pricing**: List at $Y (slightly above market) and plan to adjust in 30 days if needed

3. **Test Pricing**: List at $Z (your preferred price) for 30 days, then reduce to market value

Which approach feels right to you?

Remember, we can always negotiate up from offers, but we can't negotiate up from no offers.

What's most important - getting your asking price or getting your home sold?`,
            notes:
              "Present options rather than ultimatums. Use market data to support your recommendations and always focus on their end goal.",
          },
        ],
      },
    ],
  },
  {
    id: "buyer",
    name: "Buyer Scripts",
    description: "Scripts for working with buyers",
    icon: Users,
    gradientFrom: "#DC2626",
    gradientTo: "#EF4444",
    tabs: [
      {
        id: "buyer-consultation",
        name: "Buyer Consultation",
        description: "Initial buyer consultation scripts",
        scripts: [
          {
            title: "Buyer Consultation Script",
            objective: "To qualify buyers and secure a buyer representation agreement",
            content: `Thank you for choosing me to help you find your next home. I'm excited to work with you!

Before we start looking at homes, I need to understand your situation better:

MOTIVATION:
- What's motivating you to buy now?
- What's your ideal timeline?
- Are you selling a home as well?

FINANCIAL QUALIFICATION:
- Have you spoken with a lender yet?
- What price range are you comfortable with?
- How much do you have for a down payment?
- Any concerns about qualifying for a loan?

PROPERTY PREFERENCES:
- What areas are you considering?
- What's most important to you in a home?
- Any deal-breakers or must-haves?
- How long have you been looking?

REPRESENTATION AGREEMENT:
Now that I understand your needs, let me explain how I work with buyers...

I provide exclusive representation, which means:
- I work only for you, not the seller
- I negotiate the best price and terms for you
- I guide you through the entire process
- I'm available 24/7 for questions

To ensure I can provide this level of service, I ask all my buyers to sign a representation agreement. This protects both of us and ensures I can dedicate the time needed to find you the perfect home.

Are you ready to move forward with exclusive representation?`,
            notes:
              "Qualify thoroughly before showing homes. The representation agreement protects your time and ensures commitment from the buyer.",
          },
        ],
      },
    ],
  },
  {
    id: "general",
    name: "General Scripts",
    description: "General purpose scripts for various situations",
    icon: MessageSquare,
    gradientFrom: "#7C2D12",
    gradientTo: "#EA580C",
    tabs: [
      {
        id: "follow-up",
        name: "Follow-up",
        description: "Follow-up scripts for various situations",
        scripts: [
          {
            title: "General Follow-up Script",
            objective: "To maintain contact with prospects and move them toward a decision",
            content: `Hi [Name], it's [Your Name] with [Company]. I wanted to follow up on our conversation about [topic].

I know you mentioned you were [their situation/concern]. Have you had a chance to think about what we discussed?

(Listen to their response)

I understand. Let me ask you this - what would need to happen for you to feel comfortable moving forward?

(Address their concerns)

Here's what I suggest - why don't we schedule a brief 15-minute call this week to discuss your options? That way you can make an informed decision without any pressure.

What works better for you - Tuesday afternoon or Wednesday morning?`,
            notes:
              "Keep follow-ups brief and focused on their needs. Always offer value and make it easy for them to take the next step.",
          },
        ],
      },
    ],
  },
]
