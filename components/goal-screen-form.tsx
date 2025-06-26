"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { generateGoalScreenWallpaper } from "@/lib/generate-wallpaper"

interface Calculations {
  monthlyIncome: number
  dailyContacts: number
  dealsNeeded: number
  appointmentsNeeded: number
  conversationsNeeded: number
}

const GoalScreenForm = () => {
  const [monthlyIncome, setMonthlyIncome] = useState<number | "">("")
  const [dailyContacts, setDailyContacts] = useState<number | "">("")
  const [dealsNeeded, setDealsNeeded] = useState<number | "">("")
  const [appointmentsNeeded, setAppointmentsNeeded] = useState<number | "">("")
  const [conversationsNeeded, setConversationsNeeded] = useState<number | "">("")
  const [calculations, setCalculations] = useState<Calculations | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const calculateGoals = () => {
    const monthlyIncomeNum = Number(monthlyIncome)
    const dailyContactsNum = Number(dailyContacts)
    const dealsNeededNum = Number(dealsNeeded)
    const appointmentsNeededNum = Number(appointmentsNeeded)
    const conversationsNeededNum = Number(conversationsNeeded)

    if (
      isNaN(monthlyIncomeNum) ||
      isNaN(dailyContactsNum) ||
      isNaN(dealsNeededNum) ||
      isNaN(appointmentsNeededNum) ||
      isNaN(conversationsNeededNum)
    ) {
      alert("Please enter valid numbers for all fields.")
      return
    }

    setCalculations({
      monthlyIncome: monthlyIncomeNum,
      dailyContacts: dailyContactsNum,
      dealsNeeded: dealsNeededNum,
      appointmentsNeeded: appointmentsNeededNum,
      conversationsNeeded: conversationsNeededNum,
    })
  }

  const handleEmailWallpaper = async () => {
    if (calculations) {
      setIsLoading(true)
      try {
        await generateGoalScreenWallpaper(calculations)
        alert("Wallpaper sent to your email!")
      } catch (error) {
        console.error("Error sending email:", error)
        alert("Failed to send email. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Goal Screen Calculator</CardTitle>
        <CardDescription>Enter your goals to calculate the required daily activities.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="monthlyIncome">Monthly Income Goal</Label>
          <Input
            id="monthlyIncome"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(e.target.value)}
            type="number"
            placeholder="Enter your desired monthly income"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="dailyContacts">Daily Contacts</Label>
          <Input
            id="dailyContacts"
            value={dailyContacts}
            onChange={(e) => setDailyContacts(e.target.value)}
            type="number"
            placeholder="Enter the number of daily contacts"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="dealsNeeded">Deals Needed</Label>
          <Input
            id="dealsNeeded"
            value={dealsNeeded}
            onChange={(e) => setDealsNeeded(e.target.value)}
            type="number"
            placeholder="Enter the number of deals needed"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="appointmentsNeeded">Appointments Needed</Label>
          <Input
            id="appointmentsNeeded"
            value={appointmentsNeeded}
            onChange={(e) => setAppointmentsNeeded(e.target.value)}
            type="number"
            placeholder="Enter the number of appointments needed"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="conversationsNeeded">Conversations Needed</Label>
          <Input
            id="conversationsNeeded"
            value={conversationsNeeded}
            onChange={(e) => setConversationsNeeded(e.target.value)}
            type="number"
            placeholder="Enter the number of conversations needed"
          />
        </div>
        <Button onClick={calculateGoals}>Calculate</Button>
        {calculations && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Calculated Goals:</h3>
            <p>Monthly Income Goal: ${calculations.monthlyIncome.toLocaleString()}</p>
            <p>Daily Contacts Needed: {calculations.dailyContacts}</p>
            <p>Deals Needed: {calculations.dealsNeeded}</p>
            <p>Appointments Needed: {calculations.appointmentsNeeded}</p>
            <p>Conversations Needed: {calculations.conversationsNeeded}</p>
          </div>
        )}
        {calculations && (
          <div className="flex justify-end">
            <Button variant="outline" onClick={handleEmailWallpaper} disabled={isLoading} size="lg">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Email Wallpaper
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default GoalScreenForm
