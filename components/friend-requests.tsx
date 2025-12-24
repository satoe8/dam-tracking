"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X } from "lucide-react"
import { useRouter } from "next/navigation"

type FriendRequest = {
  id: string
  user_id: string
  profiles: {
    id: string
    display_name: string
  }
}

export function FriendRequests({ requests }: { requests: FriendRequest[] }) {
  const [processing, setProcessing] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleAccept = async (requestId: string) => {
    setProcessing(requestId)
    try {
      const { error } = await supabase.from("friends").update({ status: "accepted" }).eq("id", requestId)

      if (error) throw error

      router.refresh()
    } catch (error) {
      console.error("Error accepting request:", error)
    } finally {
      setProcessing(null)
    }
  }

  const handleReject = async (requestId: string) => {
    setProcessing(requestId)
    try {
      const { error } = await supabase.from("friends").delete().eq("id", requestId)

      if (error) throw error

      router.refresh()
    } catch (error) {
      console.error("Error rejecting request:", error)
    } finally {
      setProcessing(null)
    }
  }

  return (
    <Card className="border-amber-200 bg-amber-50">
      <CardHeader>
        <CardTitle className="text-lg text-amber-900">Friend Requests ({requests.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {requests.map((request) => (
          <div
            key={request.id}
            className="flex items-center justify-between bg-white rounded-lg p-3 border border-amber-100"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🦫</span>
              <span className="font-medium text-amber-900">{request.profiles.display_name}</span>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="text-green-600 border-green-300 hover:bg-green-50 bg-transparent"
                onClick={() => handleAccept(request.id)}
                disabled={processing === request.id}
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-red-600 border-red-300 hover:bg-red-50 bg-transparent"
                onClick={() => handleReject(request.id)}
                disabled={processing === request.id}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
