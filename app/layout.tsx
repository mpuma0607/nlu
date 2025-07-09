import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ClientLayout } from "./ClientLayout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "The Next Level U Portal - AI-Powered Real Estate Tools",
  description:
    "Transform your real estate business with AI-powered tools for prospecting, content creation, market analysis, and professional coaching.",
  keywords: "real estate, AI, prospecting, CMA, content creation, coaching, property analysis",
  authors: [{ name: "The Next Level U" }],
  openGraph: {
    title: "The Next Level U Portal - AI-Powered Real Estate Tools",
    description:
      "Transform your real estate business with AI-powered tools for prospecting, content creation, market analysis, and professional coaching.",
    type: "website",
    url: "https://thenextlevelu.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Next Level U Portal - AI-Powered Real Estate Tools",
    description:
      "Transform your real estate business with AI-powered tools for prospecting, content creation, market analysis, and professional coaching.",
  },
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
        {/* MemberSpace Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "https://static.memberspace.com/scripts/widgets.js";
                fjs.parentNode.insertBefore(js, fjs);
              }(document, 'script', 'memberspace-js'));
            `,
          }}
        />

        {/* MemberSpace Configuration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.MemberSpace = window.MemberSpace || {
                subdomain: "thenextlevelu"
              };
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
