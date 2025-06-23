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
                    <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mb-6">
                      {category.tabs.map((tab) => (
                        <TabsTrigger key={tab.id} value={tab.id}>
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
        name: "Expired Listing Script",
        description: "Professional script for contacting owners of expired listings",
        scripts: [
          {
            title: "Expired Listing Script",
            objective:
              "To establish rapport with expired listing owners and secure an appointment to interview for the listing",
            content: `(Mirror/Match Introduction) ... I'm ______ from CENTURY 21... The reason I'm here (or calling) is your property came up on our computer as an expired listing and what I am curious about is ... when I can interview for the job of getting this property sold for you... You do still want to SELL YOUR PROPERTY right...

Let me ask you: (REMEMBER TO FIND WAYS TO CONNECT)

If you sold this property ... where would you go next. (_____) Wow! (Find a way to Connect)

How soon do you have to be there. (_____) Ouch!

What do you think stopped your property from selling. (_____) Really!

How did you happen to pick the last company that you listed with. (_____) Great!

What did that company do that you liked best. (_____) You're kidding!

What do you feel they should have done to get your property sold for you. (_____) OK

What will you expect from the next company that you choose. (_____) Terrific!

Have you already chosen a company to work with. (_____) Wonderful!

Let's do this... let me show you what your house is REALLY worth in today's market and ... show you the tools that only CENTURY 21 has ... that allow us to sell 20-30 homes a day which is more than any of our competitors. You do expect the best...right.

This way at least you REALLY ...know your options... and if it makes sense, it makes sense...if it doesn't, it doesn't.

The worst case scenario is...you'll know what your house is REALLY going to sell for... and that will be nice to know, right.

So... What would be the best time for me to come back with today's real value, show you how much money you would put in your pocket and interview for the job of selling your property.

Either you will like what I have to say and want to ... hire us ... or you won't want to... hire us ...and either one is fine.

What's better for you (_____) or (_____). Fantastic!!! See you then!

When can I take a look around to ensure that I fully understand your property so I can ...maximize your value... Now since I'm here...or ___ or ___ at ___.`,
            notes:
              "This script emphasizes building rapport through questions and positioning yourself as interviewing for the job. Fill in the blanks with specific times and personalize the company references as needed.",
          },
        ],
      },
      {
        id: "fsbo",
        name: "FSBO Script",
        description: "Scripts for For Sale By Owner prospects",
        scripts: [
          {
            title: "FSBO Door Knock Script",
            objective:
              "To establish rapport with FSBO sellers through systematic questioning and secure an appointment",
            content: `____, I'm here about the home for sale... is it still available... ____ Great!

I'm ______ with CENTURY 21, and I know you are going to try it on your own for a little while, and I'm here to interview for the job when you are ready.....and that's why ... I'm curious...

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

11. When do you think you will at least ... interview CENTURY 21... for the job of selling your home. _____________ Wonderful!

12. What would have to happen .... to cause you to ... make the decision ...to ... HIRE THE BEST COMPANY ... CENTURY 21...for the job of selling your property. ___ OK!

13. Let's do this... let me ... show you what your house is REALLY worth in today's market and show you the tools that only CENTURY 21 has that allow us to sell 20-30 homes a day which is more than any of our competitors.... You do... expect the best ...don't you.... Of course!

14. This way... at least you REALLY ... know your options... and if ...it makes sense...it makes sense... if it doesn't it doesn't... either way ... let's ... find out... The worst case scenario is...you'll know what your house is REALLY going to sell for... that will be nice to know.. RIGHT!

15. What would be the best time for me to come back by with today's real value, show you how much you would put in your pocket and interview for the job of selling your property? Either you will like what I have to say and want to ...hire us... or you won't want to ...hire us...and either one is fine....

What's better for you ___ or ____ Fantastic!!! See you then!

When can I take a look at the property to ensure that I fully maximize the value? ____ or ____ or right now?`,
            notes:
              "This systematic approach uses 15 strategic questions to build rapport and uncover motivation. Practice the flow and timing between questions. Audio training files are available for reference.",
          },
        ],
      },
      {
        id: "farming",
        name: "Farming Script",
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
        name: "SOI Script",
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
(Who do you know that's getting married, divorced, Job transfer, having kids, etc) (_____) Great!

It would be OK if I called them ...right. What's their contact info______________________________. (WRITE CONTACT INFO)

By the way, when do YOU plan on moving/buying investment property. (_____)Terrific!
(Set Appointment/Set them up on listing book/Confirm their Email Address for Business Builder campaign...etc.)

Thank you SO much... I'll check in with you periodically to see who you know who is interested, okay. (_____) Great! Have a great day!`,
            notes:
              "This script emphasizes building rapport through questions and positioning yourself as interviewing for the job. Fill in the blanks with specific times and personalize the company references as needed.",
          },
        ],
      },
      {
        id: "vacant",
        name: "Vacant Land Script",
        description: "Scripts for vacant land opportunities",
        scripts: [
          {
            title: "Vacant Land Owner Contact",
            objective: "To approach owners of vacant land about selling",
            content: `"Hello, my name is [Your Name] with [Your Company]. I'm reaching out because I noticed you own the vacant property at [Address/Location]. I work with several buyers who are interested in land in this area for [development/building a home/investment].

I'm curious – have you considered selling this property?

[If yes] That's great to hear. What price range were you thinking about?

[If no] I understand. May I ask what your long-term plans are for the property? The reason I ask is that I have some insights on land values in this area that might be valuable to you, even if you're not ready to sell right now."`,
            notes: "Research zoning and potential uses before calling.",
          },
        ],
      },
    ],
  },
  {
    id: "listing-scripts",
    name: "Listing Scripts",
    description: "Scripts for listing presentations and seller interactions",
    icon: Home,
    gradientFrom: "#10B981",
    gradientTo: "#059669",
    tabs: [
      {
        id: "listing-presentation",
        name: "Listing Presentation",
        description: "Complete scripts for listing presentations and seller interactions",
        scripts: [
          {
            title: "Listing PreQual Script",
            objective:
              "To confirm appointment details and gather essential information before the listing presentation",
            content: `Mirror and Match greeting. (Repeat back their greeting exactly - match their energy / tonality / vocabulary)

__________ it's ________________ with CENTURY 21. I'm calling to confirm our appointment at _____ on _____. Does that still work for you? In order to make the most efficient use of our time, I'd like to confirm some information and ask you a few questions.

ASK QUESTIONS.
REPEAT AND APPROVE THEIR ANSWERS.
TAKE NOTES DURING THE CONVERSATION

• Are you interviewing more than one agent? Who?
• Will all of the decision makers be at our meeting?
• Where are you moving?
• When would be the ideal date to close and move? How soon do you have to be there? Why? (reason for moving)
• What do you feel is the approximate value of the home?
• Will your plans change if you can't get your price? Why?
• Have you already found your next home?
• Have you already bought your next home? If not, I'd love to interview for the job of being your buyer's agent.
• How much do you owe on your home?
• Will you help finance the home for the buyer or do you need to take the cash out for the next home?
• Do you need to sell this property in order to purchase your next?
• How would you describe your home? (take notes, use their words for your marketing remarks)
• How would you rate your home on a scale from 1 to 10?
• What would make it a 10?
• Why did you select this home ... what sold YOU?
• What did you enjoy most about living here?
• What do you think is the biggest drawback?
• What is the best feature?
• What's the most recent upgrade?`,
            notes:
              "This script helps you gather crucial information before the presentation. Take detailed notes and use their own words in your marketing materials. Confirm all decision makers will be present.",
          },
        ],
      },
    ],
  },
  {
    id: "buyer-scripts",
    name: "Buyer Scripts",
    description: "Scripts for working with buyers at every stage",
    icon: Users,
    gradientFrom: "#F59E0B",
    gradientTo: "#D97706",
    tabs: [
      {
        id: "buyer-consultation",
        name: "Buyer Consultation",
        description: "Scripts for initial buyer consultations and pre-qualification",
        scripts: [
          {
            title: "Buyer Pre-Qualification Script",
            objective:
              "To set/confirm appointment, gather essential buyer information, and establish the buyer representation relationship",
            content: `Hi, this is________________________ 
with CENTURY 21 
The reason I'm calling is to ...SET/CONFIRM our appointment...to get you into your next property...
Would____ Or____work better for you. _______

In order to make the most efficient use of our time...and provide you with the best service, I'd like to confirm some information and ask you a few questions prior to our meeting, Okay. _____(Super)

Buyer's who ... get pre-approved for a mortgage ... are in a much better negotiating position than those who don't ... Have you, by any chance, already arranged financing for your new property._____(Good) 

If YES – Good for you! What lender are you working with. Super! 
Let me do you a favor ... let's see if our in house loan officer might be able to help you to ... get a better rate... I will have him/her call you when we are finished...

If NO - Our In-House Loan Officers work with over 500 lenders to get you the best loan program. I will have one of our loan officers call you later today...

And, how much of a down payment do you plan to invest. __________Great! 

And, what price ranges are you entertaining. $ _______ To $ _______. Super! 

Ideally, when would you like to move into your new home. _____________ Great! 

Do you have to sell the property you are in now before you buy the new one...

I'm going to be sending you a link to a very brief overview presentation that I'd like you to watch before our meeting...

Let me confirm your e-mail address.____________________________

I'm also going to send you a link to a cool service that I actually pay for ...for you... which is going to send you daily updates of everything new that hits the inventory...that matches your criteria...its going to allow you to have a great understanding between now and the time anything new comes on the market before (_________).

When we get together, we're going to review all of your options as far as location...style of home...amenities...neighborhoods...everything you can possibly think of. In order to ...save us time... I'd like to ask you to ...complete our Lifestyle Profile... it will tell me your wants and needs better...so I can do the VERY BEST JOB for you. I'll e-mail it to you. (__) GREAT!

What you are going to find is that we have a very thorough system for finding the right home for each of our clients. Quite frankly...I think it's the best system in the industry. When we get together on ____________, we'll review the entire process and I'll answer any questions that you may have.`,
            notes:
              "This comprehensive script covers appointment setting, financial pre-qualification, and sets up the buyer consultation process. Make sure to send all promised materials promptly after the call.",
          },
        ],
      },
    ],
  },
  {
    id: "objection-handling",
    name: "Overcoming Objections",
    description: "Scripts for handling common objections",
    icon: MessageSquare,
    gradientFrom: "#EC4899",
    gradientTo: "#BE185D",
    tabs: [
      {
        id: "overcoming-objections",
        name: "Overcoming Objections",
        description: "Audio training for handling common objections",
        scripts: [
          {
            title: "Common Objection Handling Techniques",
            objective: "Learn to handle common objections with professional responses",
            content: `The key to handling objections is to:

1. LISTEN - Let them fully express their concern
2. ACKNOWLEDGE - Show you understand their position
3. CLARIFY - Ask questions to understand the real issue
4. RESPOND - Address their specific concern
5. CONFIRM - Make sure they're satisfied with your response

Remember: Objections are often buying signals in disguise. They indicate interest and engagement.

Common objection patterns:
• Price objections
• Timing objections  
• Authority objections
• Trust objections
• Competition objections

Each type requires a different approach and response strategy.`,
            notes:
              "Practice these responses until they become natural. Remember to listen actively to the client's concerns before responding. Audio training files provide real-world examples.",
          },
        ],
      },
    ],
  },
]
