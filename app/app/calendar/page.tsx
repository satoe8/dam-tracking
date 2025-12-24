import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { CalendarView } from "@/components/calendar-view"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function CalendarPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get all habit logs for the current month
  const now = new Date()
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1)
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0)

  const { data: habitLogs } = await supabase
    .from("habit_logs")
    .select(
      `
      id,
      date,
      completed_at,
      habits(id, title)
    `,
    )
    .eq("user_id", user.id)
    .gte("date", firstDay.toISOString().split("T")[0])
    .lte("date", lastDay.toISOString().split("T")[0])
    .order("date", { ascending: false })

  const { data: habits } = await supabase
    .from("habits")
    .select("id, title")
    .eq("user_id", user.id)
    .order("title", { ascending: true })

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto p-4 md:p-6 max-w-6xl">
        <div className="mb-6">
          <Link href="/app">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-amber-900">Calendar</h1>
          <p className="text-sm text-amber-700 mt-1">View your habit completion history</p>
        </div>

        <CalendarView habitLogs={habitLogs || []} habits={habits || []} />
      </div>
    </div>
  )
}
