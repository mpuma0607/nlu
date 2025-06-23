"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface QuickCMAResultsProps {
  data: {
    address: string
    analysisText: string
    comparableData: {
      address: string
      price: number
      bedrooms: number
      bathrooms: number
      squareFootage: number
    }[]
  }
}

export function QuickCMAResults({ data }: QuickCMAResultsProps) {
  const [userEmail, setUserEmail] = useState("")
  const [isSendingEmail, setIsSendingEmail] = useState(false)

  const sendEmail = async () => {
    if (!userEmail.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address to receive the CMA report.",
        variant: "destructive",
      })
      return
    }

    setIsSendingEmail(true)
    try {
      const response = await fetch("/api/send-cma-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          address: data.address,
          analysisText: data.analysisText,
          comparableData: data.comparableData,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to send email")
      }

      if (result.success) {
        toast({
          title: "Email Sent Successfully",
          description: "Check your inbox for your CMA report!",
        })
        setUserEmail("") // Clear email after successful send
      } else {
        throw new Error(result.error || "Failed to send email")
      }
    } catch (error) {
      console.error("Error sending email:", error)
      toast({
        title: "Email Sending Failed",
        description: error instanceof Error ? error.message : "Failed to send email. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSendingEmail(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick CMA Results for {data.address}</CardTitle>
        <CardDescription>Here's a summary of your property's comparative market analysis.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="Enter your email to receive the full report"
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <Button onClick={sendEmail} disabled={isSendingEmail}>
            {isSendingEmail ? "Sending..." : "Send Report to Email"}
          </Button>
        </div>

        <div className="grid gap-2">
          <Label>Analysis Summary</Label>
          <p>{data.analysisText}</p>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableCaption>Comparable Properties</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Address</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Bedrooms</TableHead>
                <TableHead>Bathrooms</TableHead>
                <TableHead>Sq. Footage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.comparableData.map((item) => (
                <TableRow key={item.address}>
                  <TableCell className="font-medium">{item.address}</TableCell>
                  <TableCell>${item.price}</TableCell>
                  <TableCell>{item.bedrooms}</TableCell>
                  <TableCell>{item.bathrooms}</TableCell>
                  <TableCell>{item.squareFootage}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

</merged_code>
