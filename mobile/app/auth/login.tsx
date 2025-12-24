"use client"

import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native"
import { useRouter } from "expo-router"
import { LinearGradient } from "expo-linear-gradient"
import { supabase } from "@/lib/supabase"

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields")
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      router.replace("/(tabs)")
    } catch (error: any) {
      Alert.alert("Error", error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <LinearGradient colors={["#FEF3C7", "#FED7AA"]} className="flex-1">
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1">
        <ScrollView contentContainerClassName="flex-1 px-6 pt-16">
          <TouchableOpacity onPress={() => router.back()} className="mb-8">
            <Text className="text-amber-900 text-lg">← Back</Text>
          </TouchableOpacity>

          <Text className="text-4xl font-bold text-amber-900 mb-2">Welcome Back!</Text>
          <Text className="text-lg text-amber-800 mb-8">Log in to your dam</Text>

          <View className="mb-4">
            <Text className="text-amber-900 font-semibold mb-2">Email</Text>
            <TextInput
              className="bg-white px-4 py-4 rounded-xl text-lg"
              placeholder="you@example.com"
              placeholderTextColor="#D97706"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View className="mb-6">
            <Text className="text-amber-900 font-semibold mb-2">Password</Text>
            <TextInput
              className="bg-white px-4 py-4 rounded-xl text-lg"
              placeholder="••••••••"
              placeholderTextColor="#D97706"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            onPress={handleLogin}
            disabled={loading}
            className="bg-amber-600 py-4 rounded-2xl mb-4 shadow-lg"
          >
            <Text className="text-white text-center font-bold text-lg">{loading ? "Logging In..." : "Log In"}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/auth/signup")}>
            <Text className="text-amber-700 text-center">Don't have an account? Sign Up</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  )
}
