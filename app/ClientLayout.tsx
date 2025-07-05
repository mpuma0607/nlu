import type React from "react"

interface ClientLayoutProps {
  children: React.ReactNode
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  return <div>{children}</div>
}

export default ClientLayout
