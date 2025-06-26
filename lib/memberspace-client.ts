"use client"

interface MemberSpaceUser {
  id: string
  email: string
  name?: string
  firstName?: string
  lastName?: string
  status: "active" | "inactive" | "trial"
  planName?: string
}

interface MemberSpaceAPI {
  getCurrentMember(): Promise<MemberSpaceUser | null>
  onLogin(callback: (user: MemberSpaceUser) => void): void
  onLogout(callback: () => void): void
}

declare global {
  interface Window {
    MemberSpace?: {
      onReady: (callback: () => void) => void
      getCurrentMember: () => Promise<MemberSpaceUser | null>
      onLogin: (callback: (user: MemberSpaceUser) => void) => void
      onLogout: (callback: () => void) => void
    }
  }
}

export class MemberSpaceClient {
  private isReady = false
  private readyCallbacks: (() => void)[] = []

  constructor() {
    if (typeof window !== "undefined") {
      this.initialize()
    }
  }

  private initialize() {
    if (window.MemberSpace) {
      window.MemberSpace.onReady(() => {
        this.isReady = true
        this.readyCallbacks.forEach((callback) => callback())
        this.readyCallbacks = []
      })
    } else {
      // Wait for MemberSpace to load
      const checkMemberSpace = () => {
        if (window.MemberSpace) {
          window.MemberSpace.onReady(() => {
            this.isReady = true
            this.readyCallbacks.forEach((callback) => callback())
            this.readyCallbacks = []
          })
        } else {
          setTimeout(checkMemberSpace, 100)
        }
      }
      checkMemberSpace()
    }
  }

  private onReady(callback: () => void) {
    if (this.isReady) {
      callback()
    } else {
      this.readyCallbacks.push(callback)
    }
  }

  async getCurrentUser(): Promise<MemberSpaceUser | null> {
    return new Promise((resolve) => {
      this.onReady(async () => {
        try {
          if (window.MemberSpace?.getCurrentMember) {
            const user = await window.MemberSpace.getCurrentMember()
            resolve(user)
          } else {
            resolve(null)
          }
        } catch (error) {
          console.error("Error getting current MemberSpace user:", error)
          resolve(null)
        }
      })
    })
  }

  onLogin(callback: (user: MemberSpaceUser) => void) {
    this.onReady(() => {
      if (window.MemberSpace?.onLogin) {
        window.MemberSpace.onLogin(callback)
      }
    })
  }

  onLogout(callback: () => void) {
    this.onReady(() => {
      if (window.MemberSpace?.onLogout) {
        window.MemberSpace.onLogout(callback)
      }
    })
  }
}

export const memberSpaceClient = new MemberSpaceClient()
