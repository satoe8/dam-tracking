"use client"

import { useRouter } from "expo-router"
import { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { supabase } from "@/lib/supabase"

export default function Index() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session) {
        router.replace("/(tabs)")
      }
    } catch (error) {
      console.error("Error checking session:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#F59E0B" />
      </View>
    )
  }

  return (
    <LinearGradient colors={["#FEF3C7", "#FED7AA", "#FDBA74"]} className="flex-1">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-6xl mb-2">🦫</Text>
        <Text className="text-4xl font-bold text-amber-900 mb-2">Dam Tracker</Text>
        <Text className="text-lg text-amber-800 text-center mb-12">Build habits, grow your beaver</Text>

        <TouchableOpacity
          onPress={() => router.push("/auth/login")}
          className="w-full bg-amber-600 py-4 rounded-2xl mb-4 shadow-lg"
        >
          <Text className="text-white text-center font-bold text-lg">Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/auth/signup")}
          className="w-full bg-white py-4 rounded-2xl mb-4 shadow-lg border-2 border-amber-600"
        >
          <Text className="text-amber-600 text-center font-bold text-lg">Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace("/(tabs)")} className="w-full py-4 rounded-2xl">
          <Text className="text-amber-700 text-center font-semibold">Continue as Guest (Dev Mode)</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  )
}
