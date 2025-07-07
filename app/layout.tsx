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

        {/* Default MemberSpace Script for Next Level U */}
        <Script
          id="memberspace-config-default"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Check if this is a Beggins domain
              const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
              const isBegginsAgent = hostname === 'begginsagents.com' || 
                                   hostname === 'www.begginsagents.com' || 
                                   hostname === 'beggins.thenextlevelu.com';
              
              if (!isBegginsAgent) {
                // Default Next Level U MemberSpace config
                window.MemberSpace = window.MemberSpace || {"subdomain":"thenextlevelu"};
              }
            `,
          }}
        />

        {/* Beggins-specific MemberSpace Script */}
        <Script
          id="memberspace-config-beggins"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Check if this is a Beggins domain
              const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
              const isBegginsAgent = hostname === 'begginsagents.com' || 
                                   hostname === 'www.begginsagents.com' || 
                                   hostname === 'beggins.thenextlevelu.com';
              
              if (isBegginsAgent) {
                // Beggins-specific MemberSpace config
                var MemberSpace = window.MemberSpace || {"subdomain":"begginsagents"};
                (function(d){ 
                  var s = d.createElement("script"); 
                  s.src = "https://cdn.memberspace.com/scripts/widgets.js"; 
                  var e = d.getElementsByTagName("script")[0]; 
                  e.parentNode.insertBefore(s,e); 
                }(document));
              }
            `,
          }}
        />

        {/* Default MemberSpace Script for Next Level U */}
        <Script
          id="memberspace-script-default"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Check if this is NOT a Beggins domain
              const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
              const isBegginsAgent = hostname === 'begginsagents.com' || 
                                   hostname === 'www.begginsagents.com' || 
                                   hostname === 'beggins.thenextlevelu.com';
              
              if (!isBegginsAgent) {
                // Load default MemberSpace script for Next Level U
                (function(d){ 
                  var s = d.createElement("script"); 
                  s.src = "https://cdn.memberspace.com/scripts/widgets.js"; 
                  var e = d.getElementsByTagName("script")[0]; 
                  e.parentNode.insertBefore(s,e); 
                }(document));
              }
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
