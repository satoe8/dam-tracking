"use client"

import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, Modal, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"

interface AddFriendModalProps {
  visible: boolean
  onClose: () => void
  onAdd: (username: string) => void
}

export function AddFriendModal({ visible, onClose, onAdd }: AddFriendModalProps) {
  const [username, setUsername] = useState("")

  function handleAdd() {
    if (!username) {
      Alert.alert("Error", "Please enter a username")
      return
    }

    onAdd(username)
    setUsername("")
    onClose()
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-background rounded-t-3xl p-6">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-2xl font-bold text-amber-900">Add Friend</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} color="#78350F" />
            </TouchableOpacity>
          </View>

          <View className="mb-4">
            <Text className="text-amber-900 font-semibold mb-2">Friend's Username</Text>
            <TextInput
              className="bg-white px-4 py-3 rounded-xl text-base"
              placeholder="Enter username..."
              placeholderTextColor="#D97706"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity
            onPress={handleAdd}
            disabled={!username}
            className={`py-4 rounded-2xl ${username ? "bg-amber-600" : "bg-amber-300"}`}
          >
            <Text className="text-white text-center font-bold text-lg">Add Friend</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
