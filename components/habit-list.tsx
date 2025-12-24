"use client"

import { HabitCard } from "@/components/habit-card"

type Habit = {
  id: string
  user_id: string
  title: string
  description: string | null
  frequency: string
  created_at: string
}

export function HabitList({ habits, userId }: { habits: Habit[]; userId: string }) {
  if (habits.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-amber-200">
        <p className="text-amber-600 mb-2">No habits yet</p>
        <p className="text-sm text-amber-500">Add your first habit to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {habits.map((habit) => (
        <HabitCard key={habit.id} habit={habit} userId={userId} />
      ))}
    </div>
  )
}
