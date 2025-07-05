"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function BegginsHomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Simple Header with just logo and login */}
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

          {/* Login Link */}
          <Button
            asChild
            variant="outline"
            className="bg-transparent border-white text-white hover:bg-white hover:text-black"
          >
            <Link href="/portal">Login</Link>
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

          <Button asChild size="lg" className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-4">
            <Link href="/portal">Access Your Portal</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
