"use client"

import { useState, useEffect } from "react"
import { View, Text, ScrollView, TouchableOpacity, Alert, RefreshControl, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { storage, type Friend } from "@/lib/storage"
import { FriendCard } from "@/components/FriendCard"
import { AddFriendModal } from "@/components/AddFriendModal"

export default function Friends() {
  const [friends, setFriends] = useState<Friend[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    loadFriends()
  }, [])

  async function loadFriends() {
    const loadedFriends = await storage.getFriends()
    setFriends(loadedFriends)
  }

  async function handleAddFriend(username: string) {
    const existingFriend = friends.find((f) => f.username.toLowerCase() === username.toLowerCase())
    if (existingFriend) {
      Alert.alert("Already Friends", `You're already friends with ${username}`)
      return
    }

    const newFriend: Friend = {
      id: Date.now().toString(),
      username,
      energy: Math.floor(Math.random() * 60) + 40,
      mood: "working",
    }

    const updatedFriends = [...friends, newFriend]
    await storage.saveFriends(updatedFriends)
    setFriends(updatedFriends)

    Alert.alert("Success!", `You're now friends with ${username}`)
  }

  function handlePoke(friend: Friend) {
    Alert.alert("Poke!", `You poked ${friend.username}! They'll see this when they log in.`)
  }

  async function onRefresh() {
    setRefreshing(true)
    await loadFriends()
    setRefreshing(false)
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#F59E0B" />}
      >
        <View className="pt-6 pb-4 px-4">
          <Text className="text-3xl font-bold text-amber-900 mb-2">Friends</Text>
          <Text className="text-lg text-amber-700">Check on your friends' beavers</Text>
        </View>

        <View className="px-4 mb-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-amber-900">Your Friends ({friends.length})</Text>
            <TouchableOpacity onPress={() => setShowAddModal(true)} className="bg-amber-500 p-3 rounded-xl">
              <Ionicons name="person-add" size={20} color="white" />
            </TouchableOpacity>
          </View>

          {friends.length === 0 ? (
            <View className="bg-white rounded-2xl p-8 items-center">
              <Text className="text-6xl mb-4">👥</Text>
              <Text className="text-amber-900 text-center text-lg font-semibold mb-2">No friends yet</Text>
              <Text className="text-amber-700 text-center">Add friends to see their beaver progress</Text>
            </View>
          ) : (
            friends.map((friend) => <FriendCard key={friend.id} friend={friend} onPoke={() => handlePoke(friend)} />)
          )}
        </View>
      </ScrollView>

      <AddFriendModal visible={showAddModal} onClose={() => setShowAddModal(false)} onAdd={handleAddFriend} />
    </SafeAreaView>
  )
}
