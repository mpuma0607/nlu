"use client"

import { useEffect } from "react"

export default function ProfilePage() {
  useEffect(() => {
    // Override MemberSpace widget styles after it loads
    const overrideMemberSpaceStyles = () => {
      // Add custom CSS to override MemberSpace widget constraints
      const style = document.createElement("style")
      style.textContent = `
        /* Override MemberSpace widget container */
        [data-memberspace-widget],
        .memberspace-widget,
        .ms-widget-container,
        .ms-modal,
        .ms-popup,
        iframe[src*="memberspace"] {
          width: 100% !important;
          height: 100% !important;
          max-width: none !important;
          max-height: none !important;
          min-height: 100% !important;
        }
        
        /* Override any modal or popup constraints */
        .ms-modal-content,
        .ms-popup-content,
        .memberspace-modal,
        .memberspace-popup {
          width: 100% !important;
          height: 100% !important;
          max-width: none !important;
          max-height: none !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        
        /* Override iframe constraints */
        .ms-widget-iframe,
        iframe[data-memberspace] {
          width: 100% !important;
          height: 100vh !important;
          max-width: none !important;
          max-height: none !important;
          border: none !important;
        }
        
        /* Hide any close buttons or resize handles */
        .ms-close-btn,
        .ms-resize-handle {
          display: none !important;
        }
        
        /* Ensure scrolling works within the widget */
        .ms-content,
        .memberspace-content {
          overflow: auto !important;
          height: 100% !important;
        }
      `
      document.head.appendChild(style)
    }

    // Apply styles immediately and after a delay for dynamic content
    overrideMemberSpaceStyles()
    setTimeout(overrideMemberSpaceStyles, 1000)
    setTimeout(overrideMemberSpaceStyles, 3000)

    // Watch for DOM changes and reapply styles
    const observer = new MutationObserver(() => {
      overrideMemberSpaceStyles()
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop: Full screen layout */}
      <div className="hidden md:block h-screen">
        <div className="h-full bg-white overflow-hidden">
          {/* Minimal Header */}
          <div className="bg-gradient-to-r from-[#b6a888] to-[#a39577] text-white p-2">
            <h1 className="text-lg font-bold">Member Profile</h1>
          </div>

          {/* Full-screen MemberSpace Widget */}
          <div className="h-[calc(100vh-60px)] w-full relative">
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
              }}
              dangerouslySetInnerHTML={{ __html: '[ms-widget-embed path="/member/sign_in"]' }}
            />
          </div>
        </div>
      </div>

      {/* Mobile: Full screen layout */}
      <div className="md:hidden h-screen">
        <div className="h-full bg-white overflow-hidden">
          {/* Mobile Header */}
          <div className="bg-gradient-to-r from-[#b6a888] to-[#a39577] text-white p-3">
            <h1 className="text-lg font-bold">Member Profile</h1>
          </div>

          {/* Mobile MemberSpace Widget */}
          <div className="h-[calc(100vh-60px)] w-full relative">
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
              }}
              dangerouslySetInnerHTML={{ __html: '[ms-widget-embed path="/member/sign_in"]' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
