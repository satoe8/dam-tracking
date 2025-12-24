import { View, Text, TouchableOpacity } from "react-native"
import type { Friend } from "@/lib/storage"

interface FriendCardProps {
  friend: Friend
  onPoke?: () => void
}

export function FriendCard({ friend, onPoke }: FriendCardProps) {
  const mood = friend.energy >= 80 ? "🦫✨" : friend.energy >= 50 ? "🦫🪵" : friend.energy >= 20 ? "🦫" : "😴"
  const moodText =
    friend.energy >= 80 ? "Thriving" : friend.energy >= 50 ? "Working" : friend.energy >= 20 ? "Okay" : "Sleeping"
  const barColor =
    friend.energy >= 80 ? "#10B981" : friend.energy >= 50 ? "#FBBF24" : friend.energy >= 20 ? "#F59E0B" : "#EF4444"

  return (
    <View className="bg-white border-2 border-amber-200 rounded-2xl p-4 mb-3 shadow-sm">
      <View className="flex-row items-center mb-3">
        <Text className="text-4xl mr-3">{mood}</Text>
        <View className="flex-1">
          <Text className="text-lg font-bold text-amber-900">{friend.username}</Text>
          <Text className="text-sm text-amber-700">{moodText}</Text>
        </View>
        {onPoke ? (
          <TouchableOpacity onPress={onPoke} className="bg-amber-500 px-4 py-2 rounded-xl">
            <Text className="text-white font-semibold">👋 Poke</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <View>
        <View className="flex-row justify-between mb-1">
          <Text className="text-sm text-amber-700">Energy</Text>
          <Text className="text-sm font-bold text-amber-900">{friend.energy}/100</Text>
        </View>
        <View className="h-2 bg-amber-100 rounded-full overflow-hidden">
          <View style={{ width: `${friend.energy}%`, backgroundColor: barColor }} className="h-full rounded-full" />
        </View>
      </View>
    </View>
  )
}
