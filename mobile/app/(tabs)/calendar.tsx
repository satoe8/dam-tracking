"use client"

import { useState, useEffect } from "react"
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Modal } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { storage, type Habit } from "@/lib/storage"

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [habitLogs, setHabitLogs] = useState<Record<string, string[]>>({})
  const [habits, setHabits] = useState<Habit[]>([])
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    const logs = await storage.getHabitLogs()
    const loadedHabits = await storage.getHabits()
    setHabitLogs(logs)
    setHabits(loadedHabits)
  }

  function getDaysInMonth(date: Date) {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    return { daysInMonth, startingDayOfWeek, year, month }
  }

  function getDateKey(year: number, month: number, day: number): string {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
  }

  function getCompletionCount(dateKey: string): number {
    return habitLogs[dateKey]?.length || 0
  }

  function getDayColor(count: number): string {
    if (count === 0) return "bg-gray-100"
    if (count >= 5) return "bg-green-500"
    if (count >= 3) return "bg-amber-400"
    return "bg-orange-400"
  }

  function previousMonth() {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  function nextMonth() {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth)
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
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1">
        <View className="pt-6 pb-4 px-4">
          <Text className="text-3xl font-bold text-amber-900 mb-2">Calendar</Text>
          <Text className="text-lg text-amber-700">Track your habit streak</Text>
        </View>

        <View className="px-4 mb-6">
          <View className="bg-card rounded-3xl p-4 shadow-lg">
            <View className="flex-row justify-between items-center mb-4">
              <TouchableOpacity onPress={previousMonth} className="p-2">
                <Ionicons name="chevron-back" size={24} color="#78350F" />
              </TouchableOpacity>
              <Text className="text-xl font-bold text-amber-900">
                {monthNames[month]} {year}
              </Text>
              <TouchableOpacity onPress={nextMonth} className="p-2">
                <Ionicons name="chevron-forward" size={24} color="#78350F" />
              </TouchableOpacity>
            </View>

            <View className="flex-row mb-2">
              {dayNames.map((day) => (
                <View key={day} className="flex-1 items-center">
                  <Text className="text-xs font-semibold text-amber-700">{day}</Text>
                </View>
              ))}
            </View>

            <View className="flex-row flex-wrap">
              {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                <View key={`empty-${index}`} className="w-[14.28%] aspect-square p-1" />
              ))}

              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1
                const dateKey = getDateKey(year, month, day)
                const count = getCompletionCount(dateKey)
                const colorClass = getDayColor(count)
                const isToday = new Date().toDateString() === new Date(year, month, day).toDateString()

                return (
                  <TouchableOpacity
                    key={day}
                    onPress={() => setSelectedDate(dateKey)}
                    className="w-[14.28%] aspect-square p-1"
                  >
                    <View
                      className={`flex-1 ${colorClass} rounded-lg items-center justify-center ${isToday ? "border-2 border-amber-600" : ""}`}
                    >
                      <Text className={`font-semibold ${count > 0 ? "text-white" : "text-amber-700"}`}>{day}</Text>
                      {count > 0 ? <Text className="text-xs text-white font-bold">{count}</Text> : null}
                    </View>
                  </TouchableOpacity>
                )
              })}
            </View>

            <View className="mt-4 pt-4 border-t border-amber-200">
              <Text className="text-sm font-semibold text-amber-900 mb-2">Legend</Text>
              <View className="flex-row flex-wrap gap-3">
                <View className="flex-row items-center">
                  <View className="w-4 h-4 bg-gray-100 rounded mr-2" />
                  <Text className="text-xs text-amber-700">No habits</Text>
                </View>
                <View className="flex-row items-center">
                  <View className="w-4 h-4 bg-orange-400 rounded mr-2" />
                  <Text className="text-xs text-amber-700">1-2 habits</Text>
                </View>
                <View className="flex-row items-center">
                  <View className="w-4 h-4 bg-amber-400 rounded mr-2" />
                  <Text className="text-xs text-amber-700">3-4 habits</Text>
                </View>
                <View className="flex-row items-center">
                  <View className="w-4 h-4 bg-green-500 rounded mr-2" />
                  <Text className="text-xs text-amber-700">5+ habits</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal visible={!!selectedDate} animationType="fade" transparent>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setSelectedDate(null)}
          className="flex-1 justify-center items-center bg-black/50 px-6"
        >
          <TouchableOpacity activeOpacity={1} className="bg-card rounded-3xl p-6 w-full max-w-sm">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold text-amber-900">{selectedDate}</Text>
              <TouchableOpacity onPress={() => setSelectedDate(null)}>
                <Ionicons name="close" size={24} color="#78350F" />
              </TouchableOpacity>
            </View>

            {selectedDate && habitLogs[selectedDate] ? (
              <View>
                <Text className="text-amber-900 font-semibold mb-2">Completed Habits:</Text>
                {habitLogs[selectedDate].map((habitId, index) => {
                  const habit = habits.find((h) => h.id === habitId)
                  return (
                    <View key={`${habitId}-${index}`} className="bg-green-100 p-3 rounded-xl mb-2">
                      <Text className="text-green-900 font-semibold">{habit?.name || "Deleted habit"}</Text>
                    </View>
                  )
                })}
              </View>
            ) : (
              <View className="items-center py-4">
                <Text className="text-6xl mb-2">📅</Text>
                <Text className="text-amber-700">No habits completed on this day</Text>
              </View>
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  )
}
