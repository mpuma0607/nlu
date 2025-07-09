"use client"

import { useState } from "react"

interface MemberInfo {
  id: number
  name: string
  firstName: string
  lastName: string
  email: string
  profileImageUrl: string
  memberships: Array<{
    id: number
    planId: number
    publicPlanId: string
    name: string
    type: string
    createdAt: string
    status: string
    cancelsOn?: string
    billingPeriodEnd?: string
    expiresOn?: string
    paymentFailure: boolean
    welcomeUrl: string
    contentUrl: string
  }>
  customSignupFields: Array<{
    id: number
    type: string
    required: boolean
    value: any
    options?: Array<{ label: string; value: string }>
  }>
}

interface MemberSpaceData {
  isLoggedIn: boolean
  memberInfo?: MemberInfo
}

declare global {
  interface Window {
    MemberSpace?: {
      ready: boolean
      getMemberInfo(): MemberSpaceData
    }
  }
}

export function useMemberSpaceUser() {
const [user, setUser] = useState<MemberInfo | null>(null)
const [loading, setLoading] = useState(true)
const [error, setError\
