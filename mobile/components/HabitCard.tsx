import { View, Text, TouchableOpacity, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import type { Habit } from "@/lib/storage"

interface HabitCardProps {
  habit: Habit
  onComplete: () => void
  onDelete: () => void
}

export function HabitCard({ habit, onComplete, onDelete }: HabitCardProps) {
  const isCompleted = habit.completedToday >= (habit.timesPerDay || 1)
  const progress = habit.timesPerDay
    ? `${habit.completedToday}/${habit.timesPerDay}`
    : habit.completedToday > 0
      ? "✓"
      : ""

  const bgColor = isCompleted ? "bg-green-100" : "bg-white"
  const borderColor = isCompleted ? "border-green-400" : "border-amber-200"

  function handleDelete() {
    Alert.alert("Delete Habit", "Are you sure you want to delete this habit?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: onDelete },
    ])
  }

  return (
    <View className={`${bgColor} border-2 ${borderColor} rounded-2xl p-4 mb-3 shadow-sm`}>
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-1">
          <Text className="text-lg font-bold text-amber-900 mb-1">{habit.name}</Text>
          {habit.description ? <Text className="text-sm text-amber-700">{habit.description}</Text> : null}
        </View>
        <TouchableOpacity onPress={handleDelete} className="ml-2">
          <Ionicons name="trash-outline" size={20} color="#DC2626" />
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center gap-2">
          <Text className="text-sm text-amber-700 capitalize">{habit.frequency}</Text>
          {progress ? <Text className="text-sm font-bold text-amber-900">{progress}</Text> : null}
        </View>

        <TouchableOpacity
          onPress={onComplete}
          disabled={isCompleted}
          className={`px-6 py-2 rounded-xl ${isCompleted ? "bg-green-500" : "bg-amber-500"}`}
        >
          <Text className="text-white font-bold">{isCompleted ? "Done!" : "Complete"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
