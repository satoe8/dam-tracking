import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { HabitList } from "@/components/habit-list"
import { AddHabitDialog } from "@/components/add-habit-dialog"
import { BeaverDisplay } from "@/components/beaver-display"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users, Calendar } from "lucide-react"

export default async function AppPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: habits } = await supabase
    .from("habits")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  const { data: beaverStats } = await supabase.from("beaver_stats").select("*").eq("user_id", user.id).single()

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto p-4 md:p-6 max-w-6xl">
        <header className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-amber-900">Welcome back, {profile?.display_name}!</h1>
            <p className="text-sm text-amber-700 mt-1">Keep up the great work building your habits</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/app/calendar">
              <Button variant="outline" className="border-amber-300 bg-transparent">
                <Calendar className="mr-2 h-4 w-4" />
                Calendar
              </Button>
            </Link>
            <Link href="/app/profile">
              <Button variant="outline" className="border-amber-300 bg-transparent">
                Profile
              </Button>
            </Link>
            <Link href="/app/friends">
              <Button variant="outline" className="border-amber-300 bg-transparent">
                <Users className="mr-2 h-4 w-4" />
                Friends
              </Button>
            </Link>
            <form action="/auth/logout" method="post">
              <button className="text-sm text-amber-600 hover:text-amber-800 underline">Log out</button>
            </form>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <BeaverDisplay beaverStats={beaverStats} userName={profile?.display_name || "Friend"} />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-amber-900">Your Habits</h2>
              <AddHabitDialog userId={user.id} />
            </div>
            <HabitList habits={habits || []} userId={user.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
