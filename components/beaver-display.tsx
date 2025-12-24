"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Battery, Heart, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

type BeaverStats = {
  id: string
  user_id: string
  energy: number
  mood: "happy" | "neutral" | "sad"
  last_updated: string
}

export function BeaverDisplay({
  beaverStats,
  userName,
}: {
  beaverStats: BeaverStats | null
  userName: string
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!beaverStats || !mounted) {
    return (
      <Card className="border-amber-200 bg-gradient-to-br from-white to-amber-50">
        <CardHeader>
          <CardTitle className="text-amber-900">Your Beaver Buddy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🦫</div>
            <p className="text-amber-600">Loading...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const { energy, mood } = beaverStats

  const getBeaverEmoji = () => {
    if (mood === "happy") return "🦫"
    if (mood === "sad") return "🦫"
    return "🦫"
  }

  const getMoodColor = () => {
    if (mood === "happy") return "text-green-600"
    if (mood === "sad") return "text-red-600"
    return "text-amber-600"
  }

  const getMoodLabel = () => {
    if (mood === "happy") return "Happy & Energized"
    if (mood === "sad") return "Needs Your Help"
    return "Doing Okay"
  }

  const getEnergyColor = () => {
    if (energy >= 70) return "bg-gradient-to-r from-green-500 to-emerald-500"
    if (energy >= 30) return "bg-gradient-to-r from-amber-500 to-orange-500"
    return "bg-gradient-to-r from-red-500 to-orange-500"
  }

  return (
    <Card className="border-amber-200 bg-gradient-to-br from-white to-amber-50 overflow-hidden">
      <CardHeader>
        <CardTitle className="text-amber-900 flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-500" />
          {userName}&apos;s Beaver
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center justify-center py-8 relative">
          <div className="text-9xl mb-4 animate-bounce-slow">{getBeaverEmoji()}</div>
          {mood === "happy" && (
            <div className="absolute top-4 right-12 animate-pulse">
              <Sparkles className="h-8 w-8 text-yellow-400" />
            </div>
          )}
          <p className={`text-lg font-semibold ${getMoodColor()}`}>{getMoodLabel()}</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Battery className="h-5 w-5 text-amber-600" />
              <span className="font-medium text-amber-900">Energy</span>
            </div>
            <span className="text-2xl font-bold text-amber-900">{energy}/100</span>
          </div>
          <div className="relative">
            <Progress value={energy} className="h-4" />
            <div
              className={`absolute inset-0 h-4 rounded-full ${getEnergyColor()} transition-all duration-500`}
              style={{ width: `${energy}%` }}
            />
          </div>
        </div>

        <div className="bg-amber-100 border border-amber-200 rounded-lg p-4">
          <p className="text-sm text-amber-800 text-center leading-relaxed">
            {energy >= 70 && "Your beaver is thriving! Keep up the amazing work!"}
            {energy >= 30 && energy < 70 && "Your beaver is doing well. Complete more habits to boost energy!"}
            {energy < 30 && "Your beaver needs attention! Complete habits to help them feel better."}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs text-amber-600">
          <div className="bg-white rounded p-2 border border-amber-100">
            <div className="font-semibold text-amber-900">0-29</div>
            <div>Sad</div>
          </div>
          <div className="bg-white rounded p-2 border border-amber-100">
            <div className="font-semibold text-amber-900">30-69</div>
            <div>Neutral</div>
          </div>
          <div className="bg-white rounded p-2 border border-amber-100">
            <div className="font-semibold text-amber-900">70-100</div>
            <div>Happy</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
