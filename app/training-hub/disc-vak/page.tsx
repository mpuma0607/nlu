"use client"

import Image from "next/image"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface TrainingHubPageProps {
  params: { trainingHubId: string }
}

interface Module {
  id: string
  title: string
  description: string
  videoUrl?: string
}

const modules: Module[] = [
  {
    id: "disc-overview",
    title: "DISC Overview",
    description: "An introduction to the DISC assessment and its benefits.",
    videoUrl: "https://www.youtube.com/embed/K5G9WjXhn4Q?si=W_eikEtv9L-WyZdn",
  },
  {
    id: "d-personality",
    title: "D - Dominance Personality",
    description: "Understanding the characteristics of the Dominance personality type.",
    videoUrl: "https://www.youtube.com/embed/aVSj-9x_jW0?si=MJSyJpX-wK_zjuvW",
  },
  {
    id: "i-personality",
    title: "I - Influence Personality",
    description: "Understanding the characteristics of the Influence personality type.",
    videoUrl: "https://www.youtube.com/embed/j9Y-j5iW-lc?si=W-LzB5-mD-J-V8J_",
  },
  {
    id: "s-personality",
    title: "S - Steadiness Personality",
    description: "Understanding the characteristics of the Steadiness personality type.",
    videoUrl: "https://www.youtube.com/embed/Vn9a0nJLad4?si=b-tR5QL-jU0Q-o9F",
  },
  {
    id: "c-personality",
    title: "C - Conscientiousness Personality",
    description: "Understanding the characteristics of the Conscientiousness personality type.",
    videoUrl: "https://www.youtube.com/embed/GPGLYohtY-E?si=m-tF-jk9Z-wW-lWR",
  },
  {
    id: "vak",
    title: "VAK Learning Styles",
    description: "Understanding Visual, Auditory, and Kinesthetic learning styles.",
  },
  {
    id: "art-of-connection",
    title: "The Art of Connection",
    description: "Techniques for building rapport and creating meaningful connections.",
  },
  {
    id: "mirror-matching",
    title: "Mirror & Matching",
    description: "Using mirroring and matching to enhance communication.",
  },
  {
    id: "build-rapport",
    title: "Build Rapport",
    description: "Strategies for building strong and lasting rapport.",
  },
]

const TrainingHubPage = ({ params }: TrainingHubPageProps) => {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null)
  const [expandedImage, setExpandedImage] = useState<string | null>(null)

  const handleModuleClick = (moduleId: string) => {
    const module = modules.find((module) => module.id === moduleId)
    setSelectedModule(module || null)
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-semibold text-center mb-8">Training Hub</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Module Navigation */}
        <div className="md:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Modules</h2>
          <ul className="space-y-2">
            {modules.map((module) => (
              <li key={module.id}>
                <Button variant="outline" className="w-full justify-start" onClick={() => handleModuleClick(module.id)}>
                  {module.title}
                </Button>
              </li>
            ))}
          </ul>
        </div>

        {/* Module Content */}
        <div className="md:col-span-3">
          {selectedModule ? (
            <div>
              <h2 className="text-2xl font-semibold mb-4">{selectedModule.title}</h2>
              <p className="text-gray-700 mb-4">{selectedModule.description}</p>

              {selectedModule.id === "disc-overview" && (
                <Tabs defaultvalue="overview" className="w-full">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="video">Video Lesson</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview">
                    <p className="text-gray-700">
                      The DISC assessment is a valuable tool for understanding different personality types and improving
                      communication.
                    </p>
                  </TabsContent>
                  <TabsContent value="video">
                    <div className="aspect-w-16 aspect-h-9">
                      <iframe src={selectedModule.videoUrl} title="DISC Overview Video" allowFullScreen></iframe>
                    </div>
                  </TabsContent>
                </Tabs>
              )}

              {selectedModule.id === "d-personality" && (
                <Tabs defaultvalue="overview" className="w-full">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="video">Video Lesson</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview">
                    <div className="space-y-6">
                      <div className="relative w-full">
                        <Image
                          src="/images/disc-d-personality.png"
                          alt="D - Dominance Personality"
                          width={1200}
                          height={800}
                          className="w-full object-contain"
                        />
                      </div>
                      <h3 className="text-xl font-bold">D - Dominance Personality</h3>
                      <p className="text-gray-700">
                        Dominant personalities are direct, decisive, and results-oriented. They thrive in leadership
                        roles and enjoy challenges.
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="video">
                    <div className="aspect-w-16 aspect-h-9">
                      <iframe
                        src={selectedModule.videoUrl}
                        title="D - Dominance Personality Video"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </TabsContent>
                </Tabs>
              )}

              {selectedModule.id === "i-personality" && (
                <Tabs defaultvalue="overview" className="w-full">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="video">Video Lesson</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview">
                    <div className="space-y-6">
                      <div className="relative w-full">
                        <Image
                          src="/images/disc-i-personality.png"
                          alt="I - Influence Personality"
                          width={1200}
                          height={800}
                          className="w-full object-contain"
                        />
                      </div>
                      <h3 className="text-xl font-bold">I - Influence Personality</h3>
                      <p className="text-gray-700">
                        Influence personalities are enthusiastic, optimistic, and persuasive. They excel in roles that
                        involve communication and collaboration.
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="video">
                    <div className="aspect-w-16 aspect-h-9">
                      <iframe
                        src={selectedModule.videoUrl}
                        title="I - Influence Personality Video"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </TabsContent>
                </Tabs>
              )}

              {selectedModule.id === "s-personality" && (
                <Tabs defaultvalue="overview" className="w-full">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="video">Video Lesson</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview">
                    <div className="space-y-6">
                      <div className="relative w-full">
                        <Image
                          src="/images/disc-s-personality.png"
                          alt="S - Steadiness Personality"
                          width={1200}
                          height={800}
                          className="w-full object-contain"
                        />
                      </div>
                      <h3 className="text-xl font-bold">S - Steadiness Personality</h3>
                      <p className="text-gray-700">
                        Steadiness personalities are patient, reliable, and supportive. They thrive in roles that
                        require consistency and teamwork.
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="video">
                    <div className="aspect-w-16 aspect-h-9">
                      <iframe
                        src={selectedModule.videoUrl}
                        title="S - Steadiness Personality Video"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </TabsContent>
                </Tabs>
              )}

              {selectedModule.id === "c-personality" && (
                <Tabs defaultvalue="overview" className="w-full">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="video">Video Lesson</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview">
                    <div className="space-y-6">
                      <div className="relative w-full">
                        <Image
                          src="/images/disc-c-personality.png"
                          alt="C - Conscientiousness Personality"
                          width={1200}
                          height={800}
                          className="w-full object-contain"
                        />
                      </div>
                      <h3 className="text-xl font-bold">C - Conscientiousness Personality</h3>
                      <p className="text-gray-700">
                        Conscientiousness personalities are analytical, detail-oriented, and precise. They excel in
                        roles that require accuracy and problem-solving.
                      </p>
                    </div>
                  </TabsContent>
                  <TabsContent value="video">
                    <div className="aspect-w-16 aspect-h-9">
                      <iframe
                        src={selectedModule.videoUrl}
                        title="C - Conscientiousness Personality Video"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </TabsContent>
                </Tabs>
              )}

              {selectedModule.id === "vak" && (
                <div className="space-y-6">
                  <div
                    className="relative w-full cursor-pointer hover:opacity-90 transition-opacity rounded-lg overflow-hidden"
                    onClick={() => setExpandedImage("/images/vak-learning-styles-chart.png")}
                  >
                    <Image
                      src="/images/vak-learning-styles-chart.png"
                      alt="VAK Learning Styles Overview - Getting to Know the VAK Senses"
                      width={1200}
                      height={800}
                      className="w-full object-contain"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 flex items-center justify-center">
                      <span className="bg-white bg-opacity-75 px-3 py-1 rounded-full text-sm font-medium">
                        Click to expand
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold">VAK Learning Styles</h3>
                  <p className="text-gray-700">
                    VAK represents the three primary sensory learning styles: Visual, Auditory, and Kinesthetic.
                    Understanding these preferences helps you communicate more effectively.
                  </p>

                  <div className="grid md:grid-cols-3 gap-4 mt-6">
                    <Card>
                      <CardContent className="pt-6">
                        <h4 className="font-bold text-lg text-blue-600 mb-3">Visual Learners</h4>
                        <ul className="list-disc pl-6 space-y-2 text-sm">
                          <li>Process information through seeing</li>
                          <li>Prefer charts, diagrams, and pictures</li>
                          <li>Say phrases like "I see what you mean"</li>
                          <li>Notice visual details and appearances</li>
                          <li>May gesture toward their eyes</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <h4 className="font-bold text-lg text-green-600 mb-3">Auditory Learners</h4>
                        <ul className="list-disc pl-6 space-y-2 text-sm">
                          <li>Process information through hearing</li>
                          <li>Prefer discussions and verbal instructions</li>
                          <li>Say phrases like "That sounds right"</li>
                          <li>May tilt head when listening</li>
                          <li>Distracted by noise</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="pt-6">
                        <h4 className="font-bold text-lg text-red-600 mb-3">Kinesthetic Learners</h4>
                        <ul className="list-disc pl-6 space-y-2 text-sm">
                          <li>Process information through moving and doing</li>
                          <li>Prefer hands-on activities and demonstrations</li>
                          <li>Say phrases like "I can't grasp it"</li>
                          <li>Learn by trial and error</li>
                          <li>May fidget or move around</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {selectedModule.id === "art-of-connection" && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold">The Art of Connection</h3>
                  <p className="text-gray-700">
                    Building rapport and creating meaningful connections involves active listening, empathy, and finding
                    common ground.
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li>Practice active listening by giving your full attention and responding thoughtfully.</li>
                    <li>Show empathy by acknowledging and understanding others' feelings.</li>
                    <li>Find common ground by identifying shared interests and experiences.</li>
                    <li>Use open-ended questions to encourage conversation and build deeper connections.</li>
                  </ul>
                </div>
              )}

              {selectedModule.id === "mirror-matching" && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold">Mirror & Matching</h3>
                  <p className="text-gray-700">
                    Mirroring and matching involves subtly imitating another person's behavior to create a sense of
                    rapport and connection.
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li>Mirror body language by subtly adopting similar postures and gestures.</li>
                    <li>Match vocal tone and pace to create a sense of harmony.</li>
                    <li>Use similar language and expressions to build rapport.</li>
                    <li>Be subtle and avoid overt imitation, which can be off-putting.</li>
                  </ul>
                </div>
              )}

              {selectedModule.id === "build-rapport" && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold">Build Rapport</h3>
                  <p className="text-gray-700">
                    Building strong and lasting rapport requires trust, respect, and genuine interest in others.
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li>Show genuine interest in others by asking questions and listening attentively.</li>
                    <li>Be respectful of others' opinions and perspectives, even if you disagree.</li>
                    <li>Find common interests and shared values to build a foundation of trust.</li>
                    <li>Be reliable and follow through on your commitments to build credibility.</li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <p className="text-gray-500">Select a module to view its content.</p>
          )}
        </div>
      </div>

      <Dialog open={expandedImage !== null} onOpenChange={() => setExpandedImage(null)}>
        <DialogContent className="sm:max-w-[75%] lg:max-w-[50%] xl:max-w-[40%]">
          <DialogHeader>
            <DialogTitle>Expanded Image</DialogTitle>
            <DialogDescription>
              <Image
                src={expandedImage || ""}
                alt="Expanded View"
                width={1200}
                height={800}
                className="w-full object-contain"
              />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default TrainingHubPage
