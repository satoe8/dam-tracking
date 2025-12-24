"use client"

import { useState, useEffect } from "react"
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { storage, type Habit } from "@/lib/storage"
import { BeaverDisplay } from "@/components/BeaverDisplay"
import { HabitCard } from "@/components/HabitCard"
import { AddHabitModal } from "@/components/AddHabitModal"
import { Confetti } from "@/components/Confetti"

export default function Dashboard() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [energy, setEnergy] = useState(50)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    const loadedHabits = await storage.getHabits()
    const loadedEnergy = await storage.getBeaverEnergy()
    setHabits(loadedHabits)
    setEnergy(loadedEnergy)
  }

  async function handleAddHabit(newHabit: {
    name: string
    description: string
    frequency: string
    timesPerDay?: number
  }) {
    const habit: Habit = {
      id: Date.now().toString(),
      name: newHabit.name,
      description: newHabit.description,
      frequency: newHabit.frequency as "daily" | "weekly" | "multiple",
      timesPerDay: newHabit.timesPerDay,
      completedToday: 0,
    }

    const updatedHabits = [...habits, habit]
    await storage.saveHabits(updatedHabits)
    setHabits(updatedHabits)
  }

  async function handleCompleteHabit(habitId: string) {
    const updatedHabits = habits.map((h) =>
      h.id === habitId
        ? {
            ...h,
            completedToday: h.completedToday + 1,
            lastCompleted: new Date().toISOString(),
          }
        : h,
    )

    const newEnergy = Math.min(100, energy + 10)
    await storage.saveHabits(updatedHabits)
    await storage.setBeaverEnergy(newEnergy)

    const today = new Date().toISOString().split("T")[0]
    const logs = await storage.getHabitLogs()
    if (!logs[today]) logs[today] = []
    logs[today].push(habitId)
    await storage.saveHabitLogs(logs)

    setHabits(updatedHabits)
    setEnergy(newEnergy)
    setShowConfetti(true)
  }

  async function handleDeleteHabit(habitId: string) {
    const updatedHabits = habits.filter((h) => h.id !== habitId)
    await storage.saveHabits(updatedHabits)
    setHabits(updatedHabits)
  }

  async function onRefresh() {
    setRefreshing(true)
    await loadData()
    setRefreshing(false)
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Confetti show={showConfetti} onComplete={() => setShowConfetti(false)} />

      <ScrollView
        className="flex-1"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#F59E0B" />}
      >
        <View className="pt-6 pb-4 px-4">
          <Text className="text-3xl font-bold text-amber-900 mb-2">Dam Tracker</Text>
          <Text className="text-lg text-amber-700">Build your beaver's dam</Text>
        </View>

        <BeaverDisplay energy={energy} />

        <View className="px-4 mb-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-2xl font-bold text-amber-900">Today's Habits</Text>
            <TouchableOpacity onPress={() => setShowAddModal(true)} className="bg-amber-500 p-3 rounded-xl">
              <Ionicons name="add" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {habits.length === 0 ? (
            <View className="bg-white rounded-2xl p-8 items-center">
              <Text className="text-6xl mb-4">🪵</Text>
              <Text className="text-amber-900 text-center text-lg font-semibold mb-2">No habits yet</Text>
              <Text className="text-amber-700 text-center">Tap the + button to add your first habit</Text>
            </View>
          ) : (
            habits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onComplete={() => handleCompleteHabit(habit.id)}
                onDelete={() => handleDeleteHabit(habit.id)}
              />
            ))
          )}
        </View>
      </ScrollView>

      <AddHabitModal visible={showAddModal} onClose={() => setShowAddModal(false)} onAdd={handleAddHabit} />
    </SafeAreaView>
  )
}
