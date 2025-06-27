"use client"

import { useEffect } from "react"

export default function ProfilePage() {
  useEffect(() => {
    // Override MemberSpace widget styles after it loads
    const overrideMemberSpaceStyles = () => {
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
      {/* Full Screen MemberSpace Widget */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="bg-gradient-to-r from-[#b6a888] to-[#a39577] text-white p-4 rounded-t-lg">
            <h2 className="text-xl font-bold">Member Profile</h2>
          </div>
          <div className="p-6">
            <div
              className="w-full h-[600px] md:h-[700px] overflow-hidden rounded-lg border"
              dangerouslySetInnerHTML={{ __html: '[ms-widget-embed path="/member/sign_in"]' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
