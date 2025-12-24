"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import confetti from "canvas-confetti"

type Habit = {
  id: string
  user_id: string
  title: string
  description: string | null
  frequency: string
  created_at: string
}

export function HabitCard({ habit, userId }: { habit: Habit; userId: string }) {
  const [isCompleting, setIsCompleting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleComplete = async () => {
    setIsCompleting(true)
    try {
      const { error } = await supabase.from("habit_logs").insert({
        habit_id: habit.id,
        user_id: userId,
        date: new Date().toISOString().split("T")[0],
      })

      if (error) throw error

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#f59e0b", "#fbbf24", "#fcd34d"],
      })

      router.refresh()
    } catch (error) {
      console.error("Error completing habit:", error)
    } finally {
      setIsCompleting(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this habit?")) return

    setIsDeleting(true)
    try {
      const { error } = await supabase.from("habits").delete().eq("id", habit.id)

      if (error) throw error

      router.refresh()
    } catch (error) {
      console.error("Error deleting habit:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Card className="border-amber-200 bg-white hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg text-amber-900">{habit.title}</CardTitle>
            {habit.description && <CardDescription className="mt-1">{habit.description}</CardDescription>}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-amber-600 uppercase tracking-wide">{habit.frequency}</span>
          <Button
            onClick={handleComplete}
            disabled={isCompleting}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            {isCompleting ? "Completing..." : "Complete"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
