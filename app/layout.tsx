import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ClientLayout from "./ClientLayout"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "The Next Level U Portal",
  description: "AI-powered tools and training for real estate professionals",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Unified MemberSpace Script - Works for all domains */}
        <Script
          id="memberspace-unified"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var MemberSpace = window.MemberSpace || {"subdomain":"thenextlevelu"};
              (function(d){ 
                var s = d.createElement("script"); 
                s.src = "https://cdn.memberspace.com/scripts/widgets.js"; 
                var e = d.getElementsByTagName("script")[0]; 
                e.parentNode.insertBefore(s,e); 
              }(document));
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
