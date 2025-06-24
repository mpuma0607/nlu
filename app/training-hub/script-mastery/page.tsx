"use client"

import { useState } from "react"
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
import { BookOpen, Phone, Play, Home } from "lucide-react"

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
  const [openModal, setOpenModal] = useState<string | null>(null)

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
            <Dialog
              key={category.id}
              open={openModal === category.id}
              onOpenChange={(open) => {
                if (open) {
                  setOpenModal(category.id)
                } else {
                  setOpenModal(null)
                }
              }}
            >
              <DialogTrigger asChild>
                <Button
                  className="w-full h-32 flex flex-col items-center justify-center gap-3 rounded-xl"
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
        name: "Expired Listing",
        description: "Professional scripts for contacting owners of expired listings",
        scripts: [
          {
            title: "Expired Listing Phone Script",
            objective:
              "To establish rapport with expired listing owners and secure an appointment to interview for the listing",
            content:
              "Mirror/Match Introduction ... I'm ______ from your brokerage name... The reason I'm here or calling is your property came up on our computer as an expired listing and what I am curious about is ... when I can interview for the job of getting this property sold for you... You do still want to SELL YOUR PROPERTY right...\n\nLet me ask you: REMEMBER TO FIND WAYS TO CONNECT\n\nIf you sold this property ... where would you go next. (_____) Wow! Find a way to Connect\n\nHow soon do you have to be there. (_____) Ouch!\n\nWhat do you think stopped your property from selling. (_____) Really!\n\nHow did you happen to pick the last company that you listed with. (_____) Great!\n\nWhat did that company do that you liked best. (_____) You're kidding!\n\nWhat do you feel they should have done to get your property sold for you. (_____) OK\n\nWhat will you expect from the next company that you choose. (_____) Terrific!\n\nHave you already chosen a company to work with. (_____) Wonderful!\n\nLet's do this... let me show you what your house is REALLY worth in today's market and ... show you the tools that only CENTURY 21 BEGGINS has ... that allow us to sell 20-30 homes a day which is more than any of our competitors. You do expect the best...right.\n\nThis way at least you REALLY ...know your options... and if it makes sense, it makes sense...if it doesn't, it doesn't.\n\nThe worst case scenario is...you'll know what your house is REALLY going to sell for... and that will be nice to know, right.\n\nSo... What would be the best time for me to come back with today's real value, show you how much money you would put in your pocket and interview for the job of selling your property.\n\nEither you will like what I have to say and want to ... hire us ... or you won't want to... hire us ...and either one is fine.\n\nWhat's better for you (_____) or (_____). Fantastic!!! See you then!\n\nWhen can I take a look around to ensure that I fully understand your property so I can ...maximize your value... Now since I'm here...or ___ or ___ at ___.",
            notes:
              "This script emphasizes building rapport through questions and positioning yourself as interviewing for the job. Fill in the blanks with specific times and personalize the company references as needed.",
          },
        ],
      },
    ],
  },
  {
    id: "fsbo",
    name: "FSBO",
    description: "Scripts for For Sale By Owner prospects",
    icon: Phone,
    gradientFrom: "#059669",
    gradientTo: "#047857",
    tabs: [
      {
        id: "fsbo",
        name: "FSBO Scripts",
        description: "Professional scripts for FSBO prospects",
        scripts: [
          {
            title: "FSBO Door Knock Script - 15 Step System",
            objective:
              "To establish rapport with FSBO sellers through systematic questioning and secure an appointment using a proven 15-step process",
            content:
              "____, I'm here about the home for sale... is it still available... ____ Great!\n\nI'm ______ with insert brokerage name, and I know you are going to try it on your own for a little while, and I'm here to interview for the job when you are ready.....and that's why ... I'm curious...\n\n1. If you sold this home ... where would you go next. __________ Great!\n\n2. How soon do you have to be there. _________________ No Problem!\n\n3. How long have you been trying to ... sell your property... on your own. ____ Wow!\n\n4. How would you rate your motivation to ... move ... on a scale of 1 to 10. ______ Great!\n\n5. If we were able to ... sell your home... in the next 30 days would that be OK. ___\n\n6. What methods are you using for marketing your home. _____Interesting!\n\n7. How did you determine your sales price. ________________ OK!\n\n8. Are you prepared to ... adjust your price down...when working with a buyer. __ Great!\n\n9. Why did you decide to sell yourself...rather than to ...hire the best ...Real Estate company. ________________Understandable!\n\n10. If you were to ... hire the best Company...what would you expect us to do ... to ...get your property sold... for you. ______________ Excellent!\n\n11. When do you think you will at least ... interview your brokerage name... for the job of selling your home. _____________ Wonderful!\n\n12. What would have to happen .... to cause you to ... make the decision ...to ... HIRE THE BEST COMPANY ... your brokerage name...for the job of selling your property. ___ OK!\n\n13. Let's do this... let me ... show you what your house is REALLY worth in today's market and show you the tools that only your brokerage name has that allow us to sell 20-30 homes a day which is more than any of our competitors.... You do... expect the best ...don't you.... Of course!\n\n14. This way... at least you REALLY ... know your options... and if ...it makes sense...it makes sense... if it doesn't it doesn't... either way ... let's ... find out... The worst case scenario is...you'll know what your house is REALLY going to sell for... that will be nice to know.. RIGHT!\n\n15. What would be the best time for me to come back by with today's real value, show you how much you would put in your pocket and interview for the job of selling your property? Either you will like what I have to say and want to ...hire us... or you won't want to ...hire us...and either one is fine....\n\nWhat's better for you ___ or ____ Fantastic!!! See you then!\n\nWhen can I take a look at the property to ensure that I fully maximize the value? ____ or ____ or right now?",
            notes:
              "This comprehensive 15-step system builds rapport systematically. Practice the flow and timing between questions. Each question serves a specific purpose in uncovering motivation and building trust. Audio training files provide real-world examples of this script in action.",
          },
        ],
      },
    ],
  },
  {
    id: "overcoming-objections",
    name: "Overcoming Objections",
    description: "Scripts for handling common real estate objections",
    icon: Phone,
    gradientFrom: "#DC2626",
    gradientTo: "#B91C1C",
    tabs: [
      {
        id: "overcoming-objections",
        name: "Objection Responses",
        description: "Professional responses to common seller and buyer objections",
        scripts: [
          {
            title: "Commission Objection Response",
            objective: "To address commission concerns while demonstrating value",
            content:
              "I understand your concern about commission. Let me ask you this - if I could show you that by working with me, you'll actually net more money in your pocket even after paying commission, would that be worth discussing?\n\nHere's what most people don't realize: The difference between a professional marketing your home and trying to do it yourself often results in a higher sale price that more than covers the commission.\n\nPlus, consider the time, stress, and potential legal issues you avoid. When you factor in the marketing costs, your time value, and the expertise in negotiations, most sellers find they come out ahead.\n\nWould you like me to show you exactly how this works with some recent examples?",
            notes:
              "Focus on value and net proceeds rather than just commission percentage. Use specific examples when possible.",
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
        id: "listing-prequal",
        name: "Listing PreQual",
        description: "Script for pre-qualifying sellers before the listing presentation",
        scripts: [
          {
            title: "Listing PreQual Script",
            objective:
              "To confirm appointment details and gather essential information before the listing presentation",
            content:
              "Mirror and Match greeting. Repeat back their greeting exactly - match their energy / tonality / vocabulary\n\n__________ it's ________________ with Your brokerage. I'm calling to confirm our appointment at _____ on _____. Does that still work for you? In order to make the most efficient use of our time, I'd like to confirm some information and ask you a few questions.\n\nASK QUESTIONS.\nREPEAT AND APPROVE THEIR ANSWERS.\nTAKE NOTES DURING THE CONVERSATION.\n\n• Are you interviewing more than one agent? Who?\n• Will all of the decision makers be at our meeting?\n• Where are you moving?\n• When would be the ideal date to close and move? How soon do you have to be there? Why? reason for moving\n• What do you feel is the approximate value of the home?\n• Will your plans change if you can't get your price? Why?\n• Have you already found your next home?\n• Have you already bought your next home? If not, I'd love to interview for the job of being your buyer's agent.\n• How much do you owe on your home?\n• Will you help finance the home for the buyer or do you need to take the cash out for the next home?\n• Do you need to sell this property in order to purchase your next?\n• How would you describe your home? take notes, use their words for your marketing remarks\n• How would you rate your home on a scale from 1 to 10?\n• What would make it a 10?\n• Why did you select this home ... what sold YOU?\n• What did you enjoy most about living here?\n• What do you think is the biggest drawback?\n• What is the best feature?\n• What's the most recent upgrade?\n• Have there been other improvements to the property?\n• What's the approximate age of the roof?\n• Age of appliances?\n\nI'd like to send over a brief video showing our marketing strategies. What's your preferred method of contact? Text or email? send the Strategic Marketing Presentation video\n\nI'd also like to email you our listing documents and disclosures for your review. This will be coming in an email from me through dotloop. set up a listing loop and share with the seller\n\nHere's a blank sample of our Strategic Positioning Analysis. I'll be back with one of these specifically prepared for your property for us to review together. send blank example using the Listing Package in MoxiPresent\n\nThis will show:\n• Your top 5 competitors so we can evaluate the features and benefits vs your property\n• 5 most recent solds that appraisers will see\n• 5 most recent properties that have been rejected no longer on the market",
            notes:
              "This script helps you gather crucial information before the presentation. Take detailed notes and use their own words in your marketing materials. Confirm all decision makers will be present and send all promised materials promptly.",
          },
        ],
      },
      {
        id: "listing-presentation",
        name: "Listing Presentation",
        description: "Complete script for the listing presentation meeting",
        scripts: [
          {
            title: "The Listing Presentation Script",
            objective:
              "To secure the listing agreement through a structured presentation focused on motivation and pricing",
            content:
              "Mirror and Match greeting. Repeat back their greeting exactly - match their energy / tonality / vocabulary\n\nASK QUESTIONS.\nREPEAT AND APPROVE THEIR ANSWERS.\nTAKE NOTES DURING THE CONVERSATION.\n\nThank you for having me over. This should only take a few minutes. Let's go have a seat at the kitchen table.\n\nI wrote down 3 important questions for you ...\n\n• Have you absolutely decided to sell your property?\n\n• Will you position your property to sell versus the competition? Or do we position your property so it sits on the market?\n\n• it's totally ok to say Yes to this one Do you want insert your brokerage name to handle the sale for you?\n\nIf they say yes, Go to the PRICING and SIGN THE CONTRACT.\nIf No or they are not sure yet ... then continue on!\n\nTALK PRICE ONCE HIRED.\n\nAt the end of my presentation, one of three things will happen ...\n\n• You'll have the opportunity to hire us.\n• You'll decide not to hire me\n• We'll decide not to market your property ... and any of these is fine. This will only happen if we can't come to agreement on price and terms\n\nLet's quickly take a moment to review the questions I asked you over the phone.\n\n• You said you were moving to _______________ Right?\n• And you said you want to be there by ______________ Correct?\n• You think you would like to price your property at _______________ Right?\n• And ... you said you owe _________________ Right?\n• And ... you did did not want to hold seller financing ___________________ Correct?\n\nDid you have the opportunity to watch the presentation that I emailed to you?\n\nYES - Great! Any questions? What did you think about it?\nNO - No Problem. Please take a few minutes when you can. or offer to watch it together\n\nThere are really only two issues we have to look at today.\n\n• Your motivation to sell your property ... and\n• The price we set on your property.\n\nNow ... It's important that you understand ... these are the only two issues in selling real estate today ... are we clear on that?\n\nI have prepared a Strategic Positioning Analysis for you.\n\nThe purpose of the Strategic Positioning Analysis is to determine the value of your home in the eyes of the BUYER. Do you know how Buyers determine value? Buyers determine value by comparison shopping. They look at the price of your home based on its features and benefits, and they compare it with the features and benefits of similar homes that have sold recently or are currently on the market.\n\nWhat we have found is that if you want to increase VALUE: You need to either\n\n• Lower the price ... or...\n• Have more features and benefits for the same price.\n\nSo ... unless you're planning to add more features/benefits to your home ... Are you? NO Then ... price is the only issue. Can I show you what I mean? Let's look at the Strategic Positioning Analysis that I prepared for you.\n\nWe are going to compare your property with:\n\n• 5 Similar Properties Current competition - What Buyers Can Pay.\n• 5 Sold Properties - What Buyers Did Pay.\n• 5 Expired/Withdrawn/Cancelled - What Buyers Refused to Pay.\n\nHere are my questions for you. Ask for each ... ACTIVES 1st, SOLDS 2nd, and EXPIREDS 3rd\n\n• What's the least expensive home we are competing with Active Sold Expired ... CIRCLE THEIR ANSWER\n• What's the most expensive home we are competing with Active Sold Expired ... CIRCLE THEIR ANSWER\n• Which home is most similar to yours ... Active Sold Expired ... CIRCLE THEIR ANSWER\n\nYou said that you would like to have this property sold by _______, right? OK. Let's review our Seller's Cost Estimator to see how much money you will put in your pocket in the time frame that you want. Here is the range of values where your home should sell.\n\n• Pricing towards the left side will result in a SLOWER sale.\n\n• Pricing towards the right side will result in a FASTER sale.\n\n• Pricing towards the middle will result in a sale in the AVERAGE time on market.\n\nNow that you've seen these prices ... what price do you feel we should use to get this property sold for you in your timeframe? I will write that price in the listing agreement and let's simply ... SIGN THE LISTING AGREEMENT ... and let's get your property sold!",
            notes:
              "This presentation script focuses on two key issues: motivation and pricing. Use the Strategic Positioning Analysis to guide pricing discussions. Always aim to secure the listing agreement at the end of the presentation.",
          },
        ],
      },
    ],
  },
  {
    id: "buyer-scripts",
    name: "Buyer Scripts",
    description: "Scripts for buyer consultations and interactions",
    icon: Home,
    gradientFrom: "#0EA5E9",
    gradientTo: "#0284C7",
    tabs: [
      {
        id: "buyer-prequal",
        name: "Buyer PreQual",
        description: "Script for pre-qualifying buyers before consultation",
        scripts: [
          {
            title: "Buyer Pre Qualification Script",
            objective: "To confirm appointment details, assess financing status, and gather buyer requirements",
            content:
              "Hi, this is________________________ with your brokerage name The reason I'm calling is to ...SET/CONFIRM our appointment...to get you into your next property...\n\nWould____ Or____work better for you. _______\n\nIn order to make the most efficient use of our time...and provide you with the best service, I'd like to confirm some information and ask you a few questions prior to our meeting, Okay. _____Super\n\nBuyer's who ... get pre-approved for a mortgage ... are in a much better negotiating position than those who don't ... Have you, by any chance, already arranged financing for your new property._____Good\n\nIf YES – Good for you! What lender are you working with. Super! Let me do you a favor ... let's see if our in house loan officer might be able to help you to ... get a better rate... I will have him/her call you when we are finished...\n\nIf NO - Our In-House Loan Officers work with over 500 lenders to get you the best loan program. I will have one of our loan officers call you later today...\n\nAnd, how much of a down payment do you plan to invest. __________Great!\n\nAnd, what price ranges are you entertaining. $ To $ . Super!\n\nIdeally, when would you like to move into your new home. Great!\n\nDo you have to sell the property you are in now before you buy the new on...\n\nI'm going to be sending you a link to a very brief overview presentation that I'd like you to watch before our meeting...\n\nLet me confirm your e-mail address.____________________________\n\nI'm also going to send you a link to a cool service that I actually pay for ...for you... which is going to send you daily updates of everything new that hits the inventory...that matches your criteria...its going to allow you to have a great understanding between now and the time anything new comes on the market before _________.\n\nWhen we get together, we're going to review all of your options as far as location...style of home...amenities...neighborhoods...everything you can possibly think of. In order to ...save us time ... I'd like to ask you to ...complete our Lifestyle Profile ... it will tell me your wants and needs better...so I can do the VERY BEST JOB for you. I'll e-mail it to you. __ GREAT!\n\nWhat you are going to find is that we have a very thorough system for finding the right home for each of our clients. Quite frankly...I think it's the best system in the industry. When we get together on ____________, we'll review the entire process and I'll answer any questions that you may have.",
            notes:
              "This script systematically gathers buyer information while positioning your professional services. Always follow up with promised materials and confirm all appointments.",
          },
        ],
      },
    ],
  },
]
