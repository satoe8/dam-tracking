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

export default function SignUp() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSignUp() {
    if (!email || !password || !username) {
      Alert.alert("Error", "Please fill in all fields")
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      })

      if (error) throw error

      Alert.alert("Success!", "Account created! Please check your email to verify your account.", [
        { text: "OK", onPress: () => router.replace("/auth/login") },
      ])
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

          <Text className="text-4xl font-bold text-amber-900 mb-2">Join Dam Tracker</Text>
          <Text className="text-lg text-amber-800 mb-8">Create your beaver companion</Text>

          <View className="mb-4">
            <Text className="text-amber-900 font-semibold mb-2">Username</Text>
            <TextInput
              className="bg-white px-4 py-4 rounded-xl text-lg"
              placeholder="beaverbuilder"
              placeholderTextColor="#D97706"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>

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
            onPress={handleSignUp}
            disabled={loading}
            className="bg-amber-600 py-4 rounded-2xl mb-4 shadow-lg"
          >
            <Text className="text-white text-center font-bold text-lg">
              {loading ? "Creating Account..." : "Create Account"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/auth/login")}>
            <Text className="text-amber-700 text-center">Already have an account? Log In</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  )
}
