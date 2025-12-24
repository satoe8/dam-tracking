"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

type HabitLog = {
  id: string
  date: string
  completed_at: string
  habits: {
    id: string
    title: string
  }
}

type Habit = {
  id: string
  title: string
}

export function CalendarView({ habitLogs, habits }: { habitLogs: HabitLog[]; habits: Habit[] }) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const startingDayOfWeek = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const getLogsForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
    return habitLogs.filter((log) => log.date === dateStr)
  }

  const getDayColor = (day: number) => {
    const logs = getLogsForDate(day)
    if (logs.length === 0) return "bg-white"
    if (logs.length >= 3) return "bg-green-100 border-green-300"
    if (logs.length >= 2) return "bg-amber-100 border-amber-300"
    return "bg-orange-100 border-orange-300"
  }

  const calendarDays = []
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null)
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  const today = new Date()
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month

  return (
    <div className="space-y-6">
      <Card className="border-amber-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl text-amber-900">
              {monthNames[month]} {year}
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={previousMonth} className="border-amber-300 bg-transparent">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={nextMonth} className="border-amber-300 bg-transparent">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center font-semibold text-sm text-amber-700 py-2">
                {day}
              </div>
            ))}

            {calendarDays.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} className="aspect-square" />
              }

              const logs = getLogsForDate(day)
              const isToday = isCurrentMonth && today.getDate() === day

              return (
                <div
                  key={day}
                  className={`aspect-square border-2 rounded-lg p-2 transition-all hover:shadow-md ${getDayColor(day)} ${isToday ? "ring-2 ring-amber-400" : "border-amber-200"}`}
                >
                  <div className="flex flex-col h-full">
                    <span className={`text-sm font-semibold ${isToday ? "text-amber-900" : "text-amber-700"}`}>
                      {day}
                    </span>
                    <div className="flex-1 flex items-center justify-center">
                      {logs.length > 0 && <span className="text-2xl">🦫</span>}
                    </div>
                    {logs.length > 0 && (
                      <span className="text-xs text-center font-medium text-amber-900">{logs.length}</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-white border-2 border-amber-200 rounded" />
              <span className="text-sm text-amber-700">No habits</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-100 border-2 border-orange-300 rounded" />
              <span className="text-sm text-amber-700">1 habit</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-amber-100 border-2 border-amber-300 rounded" />
              <span className="text-sm text-amber-700">2 habits</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 border-2 border-green-300 rounded" />
              <span className="text-sm text-amber-700">3+ habits</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-amber-200">
        <CardHeader>
          <CardTitle className="text-xl text-amber-900">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {habitLogs.length === 0 ? (
            <p className="text-center py-8 text-amber-600">No activity yet this month</p>
          ) : (
            <div className="space-y-2">
              {habitLogs.slice(0, 10).map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between bg-amber-50 rounded-lg p-3 border border-amber-100"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🦫</span>
                    <div>
                      <p className="font-medium text-amber-900">{log.habits.title}</p>
                      <p className="text-xs text-amber-600">{new Date(log.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <span className="text-xs text-amber-700">
                    {new Date(log.completed_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
