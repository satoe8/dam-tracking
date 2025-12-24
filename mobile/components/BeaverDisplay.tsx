"use client"

import { View, Text, Animated } from "react-native"
import { useEffect, useRef } from "react"

interface BeaverDisplayProps {
  energy: number
}

export function BeaverDisplay({ energy }: BeaverDisplayProps) {
  const bounceAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(1)).current

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ).start()
  }, [])

  const mood = energy >= 80 ? "happy" : energy >= 50 ? "working" : energy >= 20 ? "neutral" : "sleeping"
  const barColor = energy >= 80 ? "#10B981" : energy >= 50 ? "#FBBF24" : energy >= 20 ? "#F59E0B" : "#EF4444"

  const getMessage = () => {
    if (energy >= 80) return "Your beaver is thriving!"
    if (energy >= 50) return "Keep up the good work!"
    if (energy >= 20) return "Your beaver needs some habits"
    return "Complete habits to revive your beaver"
  }

  return (
    <View className="bg-card rounded-3xl p-6 mx-4 mb-6 shadow-lg">
      <View className="items-center mb-4">
        <Animated.Text
          style={{
            transform: [{ translateY: bounceAnim }, { scale: scaleAnim }],
          }}
          className="text-7xl"
        >
          {mood === "happy" ? "🦫✨" : mood === "working" ? "🦫🪵" : mood === "neutral" ? "🦫" : "😴"}
        </Animated.Text>
      </View>

      <View className="mb-4">
        <View className="flex-row justify-between mb-2">
          <Text className="text-amber-900 font-semibold">Energy Level</Text>
          <Text className="text-amber-900 font-bold">{energy}/100</Text>
        </View>
        <View className="h-3 bg-amber-100 rounded-full overflow-hidden">
          <View style={{ width: `${energy}%`, backgroundColor: barColor }} className="h-full rounded-full" />
        </View>
      </View>

      <Text className="text-amber-800 text-center font-medium">{getMessage()}</Text>
    </View>
  )
}
