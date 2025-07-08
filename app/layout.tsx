import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ClientLayout from "./ClientLayout"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "The Next Level U - Real Estate Platform",
  description: "AI-powered tools and training for real estate professionals",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />

        {/* MemberSpace Script - Domain Based Configuration */}
        <Script
          id="memberspace-unified"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;
                
                var hostname = window.location.hostname;
                var subdomain = '';
                
                // Determine MemberSpace subdomain based on domain
                if (hostname === 'begginsagents.com' || 
                    hostname === 'www.begginsagents.com' || 
                    hostname === 'beggins.thenextlevelu.com') {
                  subdomain = 'begginsagents';
                } else {
                  // For getempowerai.com and all other domains, use getempowerai
                  subdomain = 'getempowerai';
                }
                
                // Set MemberSpace configuration
                window.MemberSpace = window.MemberSpace || {"subdomain": subdomain};
                
                // Load MemberSpace widgets script
                var script = document.createElement("script");
                script.src = "https://cdn.memberspace.com/scripts/widgets.js";
                var firstScript = document.getElementsByTagName("script")[0];
                firstScript.parentNode.insertBefore(script, firstScript);
                
                console.log('MemberSpace loaded for domain:', hostname, 'with subdomain:', subdomain);
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>

        {/* Fastbots Chat Widget - Higher Priority */}
        <Script
          id="fastbots-priority"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Only skip on consumer home page
                if (typeof window !== 'undefined' && window.location.pathname === '/') {
                  return;
                }
                
                // Add the Fastbots script to head with higher priority
                var script = document.createElement('script');
                script.defer = true;
                script.src = 'https://app.fastbots.ai/embed.js';
                script.setAttribute('data-bot-id', 'cmb9q8pc4072ku0lvydb0l8io');
                document.head.appendChild(script);
              })();
            `,
          }}
        />
      </body>
    </html>
  )
}
