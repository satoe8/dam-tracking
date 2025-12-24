"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Battery } from "lucide-react"

type Friend = {
  id: string
  friend_id: string
  profiles: {
    id: string
    display_name: string
  }
  beaver_stats: {
    energy: number
    mood: string
  }
}

export function FriendsList({ friends }: { friends: Friend[]; userId: string }) {
  if (friends.length === 0) {
    return (
      <Card className="border-amber-200">
        <CardContent className="text-center py-12">
          <p className="text-amber-600 mb-2">No friends yet</p>
          <p className="text-sm text-amber-500">Add friends to see their beaver progress!</p>
        </CardContent>
      </Card>
    )
  }

  const getEnergyColor = (energy: number) => {
    if (energy >= 70) return "bg-gradient-to-r from-green-500 to-emerald-500"
    if (energy >= 30) return "bg-gradient-to-r from-amber-500 to-orange-500"
    return "bg-gradient-to-r from-red-500 to-orange-500"
  }

  const getMoodEmoji = (mood: string) => {
    if (mood === "happy") return "😊"
    if (mood === "sad") return "😔"
    return "😐"
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-amber-900 mb-4">Your Friends ({friends.length})</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {friends.map((friend) => (
          <Card key={friend.id} className="border-amber-200 bg-white hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-amber-900 flex items-center justify-between">
                <span>{friend.profiles.display_name}</span>
                <span className="text-3xl">{getMoodEmoji(friend.beaver_stats.mood)}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="text-5xl">🦫</div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Battery className="h-4 w-4 text-amber-600" />
                      <span className="text-sm font-medium text-amber-900">Energy</span>
                    </div>
                    <span className="text-lg font-bold text-amber-900">{friend.beaver_stats.energy}/100</span>
                  </div>
                  <div className="relative">
                    <Progress value={friend.beaver_stats.energy} className="h-3" />
                    <div
                      className={`absolute inset-0 h-3 rounded-full ${getEnergyColor(friend.beaver_stats.energy)} transition-all`}
                      style={{ width: `${friend.beaver_stats.energy}%` }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
