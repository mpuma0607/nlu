"use client"

import { useState } from "react"

export default function ZoomSetupPage() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const setupSteps = [
    {
      id: 1,
      title: "Account Setup & Basic Configuration",
      description: "Create your Zoom account and configure basic settings",
      duration: "10 minutes",
      content: {
        overview: "Set up your professional Zoom account with appropriate settings for real estate client meetings.",
        steps: [
          "Create your Zoom account using your professional email",
          "Complete your profile with professional information",
          "Upload a professional profile photo",
          "Configure your display name for meetings",
          "Set up your time zone and meeting preferences",
          "Configure basic security settings and passwords",
        ],
        tips: [
          "Use your professional email address for credibility",
          "Choose a clear, professional profile photo",
          "Set up a consistent display name that clients will recognize",
          "Enable waiting rooms for added security",
        ],
      },
    },
    {
      id: 2,
      title: "Meeting Settings & Security",
      description: "Configure meeting settings and security features",
      duration: "15 minutes",
      content: {
        overview: "Set up secure meeting settings appropriate for confidential real estate discussions.",
        steps: [
          "Configure default meeting settings and security options",
          "Set up waiting room and meeting passwords",
          "Configure screen sharing and annotation permissions",
          "Set up meeting recording preferences",
          "Configure participant management settings",
          "Set up meeting notifications and reminders",
        ],
        tips: [
          "Always use waiting rooms for client meetings",
          "Set up automatic meeting recordings for important consultations",
          "Limit screen sharing to hosts for security",
          "Use meeting passwords for all client meetings",
        ],
      },
    },
    {
      id: 3,\
      title: "Calendar Integration &
