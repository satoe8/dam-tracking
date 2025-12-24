"use client"

import { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, Alert, SafeAreaView, ScrollView } from "react-native"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import * as Clipboard from "expo-clipboard"
import { supabase } from "@/lib/supabase"
import { storage } from "@/lib/storage"

export default function Profile() {
  const router = useRouter()
  const [energy, setEnergy] = useState(50)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user || null)

      const loadedEnergy = await storage.getBeaverEnergy()
      setEnergy(loadedEnergy)
    } catch (error) {
      console.error("Error loading profile:", error)
    } finally {
      setLoading(false)
    }
  }

  async function handleCopyId() {
    if (user) {
      await Clipboard.setStringAsync(user.id)
      Alert.alert("Copied!", "Your User ID has been copied to clipboard")
    }
  }

  async function handleLogout() {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: async () => {
          await supabase.auth.signOut()
          router.replace("/")
        },
      },
    ])
  }

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center">
        <Text className="text-amber-900">Loading...</Text>
      </SafeAreaView>
    )
  }

  const mood = energy >= 80 ? "🦫✨" : energy >= 50 ? "🦫🪵" : energy >= 20 ? "🦫" : "😴"
  const username = user?.user_metadata?.username || "Guest"
  const isGuest = !user

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1">
        <View className="pt-6 pb-4 px-4">
          <Text className="text-3xl font-bold text-amber-900 mb-2">Profile</Text>
          <Text className="text-lg text-amber-700">Manage your account</Text>
        </View>

        <View className="px-4 mb-6">
          <View className="bg-card rounded-3xl p-6 items-center shadow-lg">
            <Text className="text-7xl mb-4">{mood}</Text>
            <Text className="text-2xl font-bold text-amber-900 mb-2">{username}</Text>
            {isGuest ? (
              <View className="bg-amber-100 px-4 py-2 rounded-xl">
                <Text className="text-amber-800 font-semibold">Guest Mode</Text>
              </View>
            ) : (
              <Text className="text-amber-700">{user?.email}</Text>
            )}
            <View className="w-full mt-4">
              <View className="flex-row justify-between mb-2">
                <Text className="text-amber-900 font-semibold">Energy Level</Text>
                <Text className="text-amber-900 font-bold">{energy}/100</Text>
              </View>
              <View className="h-3 bg-amber-100 rounded-full overflow-hidden">
                <View
                  style={{ width: `${energy}%` }}
                  className={`h-full rounded-full ${energy >= 80 ? "bg-green-500" : energy >= 50 ? "bg-amber-400" : energy >= 20 ? "bg-orange-500" : "bg-red-500"}`}
                />
              </View>
            </View>
          </View>
        </View>

        <View className="px-4">
          {!isGuest ? (
            <TouchableOpacity
              onPress={handleCopyId}
              className="bg-white p-4 rounded-2xl mb-3 flex-row items-center justify-between border-2 border-amber-200"
            >
              <View className="flex-row items-center">
                <Ionicons name="copy-outline" size={24} color="#F59E0B" />
                <Text className="text-amber-900 font-semibold ml-3">Copy User ID</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#D97706" />
            </TouchableOpacity>
          ) : null}

          {isGuest ? (
            <View className="bg-amber-50 p-4 rounded-2xl mb-3 border-2 border-amber-300">
              <Text className="text-amber-900 font-semibold mb-2">Sign up to save your progress</Text>
              <Text className="text-amber-700 text-sm mb-3">
                Your data is only stored locally. Create an account to sync across devices!
              </Text>
              <TouchableOpacity onPress={() => router.push("/auth/signup")} className="bg-amber-600 py-3 rounded-xl">
                <Text className="text-white text-center font-bold">Create Account</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={handleLogout}
              className="bg-red-500 p-4 rounded-2xl flex-row items-center justify-center"
            >
              <Ionicons name="log-out-outline" size={24} color="white" />
              <Text className="text-white font-bold text-lg ml-2">Log Out</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
