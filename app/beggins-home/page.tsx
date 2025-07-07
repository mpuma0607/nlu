"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useMemberSpaceUser } from "@/hooks/use-memberspace-user"

export default function BegginsHomePage() {
  const { user, loading } = useMemberSpaceUser()

  const handleAuthAction = () => {
    if (user) {
      // User is logged in, go to portal
      window.location.href = "/portal"
    } else {
      // User not logged in, open MemberSpace signup/login
      window.open("https://www.thenextlevelu.com?msopen=/member/plans/x8lgb2fe1z", "_blank")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Simple Header with ONLY logo and login - NO navigation menu */}
      <header className="absolute top-0 left-0 right-0 z-10 p-6">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo - using white text logo for dark background */}
          <div className="flex items-center">
            <Image
              src="/images/beggins-university-dark.png"
              alt="Beggins University"
              width={200}
              height={60}
              className="object-contain"
            />
          </div>

          {/* Login/Sign up Button */}
          <Button
            onClick={handleAuthAction}
            variant="outline"
            className="bg-transparent border-white text-white hover:bg-white hover:text-black"
            disabled={loading}
          >
            {loading ? "Loading..." : user ? "Portal" : "Log in/Sign up"}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Welcome to Beggins University</h1>

          <div className="flex items-center justify-center mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent w-32"></div>
            <span className="px-6 text-xl text-gray-300 font-light">EMPOWER • EDUCATE • ENCOURAGE</span>
            <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent w-32"></div>
          </div>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
            Your comprehensive training and development platform, designed to elevate our agents to the next level of
            success.
          </p>

          <Button
            onClick={handleAuthAction}
            size="lg"
            className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-4"
            disabled={loading}
          >
            {loading ? "Loading..." : user ? "Access Your Portal" : "Access Your Portal"}
          </Button>
        </div>
      </main>
    </div>
  )
}
