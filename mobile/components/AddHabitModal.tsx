"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, Modal, ScrollView } from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface AddHabitModalProps {
  visible: boolean
  onClose: () => void
  onAdd: (habit: { name: string; description: string; frequency: string; timesPerDay?: number }) => void
}

export function AddHabitModal({ visible, onClose, onAdd }: AddHabitModalProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [frequency, setFrequency] = useState<"daily" | "weekly" | "multiple">("daily")
  const [timesPerDay, setTimesPerDay] = useState("2")

  function handleAdd() {
    if (!name) return

    onAdd({
      name,
      description,
      frequency,
      timesPerDay: frequency === "multiple" ? Number.parseInt(timesPerDay) || 2 : undefined,
    })

    setName("")
    setDescription("")
    setFrequency("daily")
    setTimesPerDay("2")
    onClose()
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-background rounded-t-3xl p-6" style={{ minHeight: "60%" }}>
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-2xl font-bold text-amber-900">Add New Habit</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color="#78350F" />
            </TouchableOpacity>
          </View>

          <ScrollView>
            <View className="mb-4">
              <Text className="text-amber-900 font-semibold mb-2">Habit Name *</Text>
              <TextInput
                className="bg-white px-4 py-3 rounded-xl text-base"
                placeholder="Exercise, Read, Meditate..."
                placeholderTextColor="#D97706"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View className="mb-4">
              <Text className="text-amber-900 font-semibold mb-2">Description</Text>
              <TextInput
                className="bg-white px-4 py-3 rounded-xl text-base"
                placeholder="Optional details..."
                placeholderTextColor="#D97706"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={2}
              />
            </View>

            <View className="mb-4">
              <Text className="text-amber-900 font-semibold mb-2">Frequency</Text>
              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={() => setFrequency("daily")}
                  className={`flex-1 py-3 rounded-xl ${frequency === "daily" ? "bg-amber-500" : "bg-white"}`}
                >
                  <Text
                    className={`text-center font-semibold ${frequency === "daily" ? "text-white" : "text-amber-900"}`}
                  >
                    Daily
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setFrequency("multiple")}
                  className={`flex-1 py-3 rounded-xl ${frequency === "multiple" ? "bg-amber-500" : "bg-white"}`}
                >
                  <Text
                    className={`text-center font-semibold ${frequency === "multiple" ? "text-white" : "text-amber-900"}`}
                  >
                    Multiple/Day
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setFrequency("weekly")}
                  className={`flex-1 py-3 rounded-xl ${frequency === "weekly" ? "bg-amber-500" : "bg-white"}`}
                >
                  <Text
                    className={`text-center font-semibold ${frequency === "weekly" ? "text-white" : "text-amber-900"}`}
                  >
                    Weekly
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {frequency === "multiple" ? (
              <View className="mb-4">
                <Text className="text-amber-900 font-semibold mb-2">Times Per Day</Text>
                <TextInput
                  className="bg-white px-4 py-3 rounded-xl text-base"
                  placeholder="2"
                  placeholderTextColor="#D97706"
                  value={timesPerDay}
                  onChangeText={setTimesPerDay}
                  keyboardType="number-pad"
                />
              </View>
            ) : null}

            <TouchableOpacity
              onPress={handleAdd}
              disabled={!name}
              className={`py-4 rounded-2xl mt-4 ${name ? "bg-amber-600" : "bg-amber-300"}`}
            >
              <Text className="text-white text-center font-bold text-lg">Add Habit</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}
