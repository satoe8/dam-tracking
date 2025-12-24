"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserPlus } from "lucide-react"
import { useRouter } from "next/navigation"

export function AddFriendDialog({ userId }: { userId: string }) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Find user by email through profiles
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", email)
        .single()

      if (profileError) {
        setError("User not found. Ask your friend for their User ID.")
        return
      }

      if (profileData.id === userId) {
        setError("You cannot add yourself as a friend.")
        return
      }

      // Check if already friends
      const { data: existingFriendship } = await supabase
        .from("friends")
        .select("id")
        .or(
          `and(user_id.eq.${userId},friend_id.eq.${profileData.id}),and(user_id.eq.${profileData.id},friend_id.eq.${userId})`,
        )
        .single()

      if (existingFriendship) {
        setError("You are already friends or have a pending request.")
        return
      }

      const { error: insertError } = await supabase.from("friends").insert({
        user_id: userId,
        friend_id: profileData.id,
        status: "pending",
      })

      if (insertError) throw insertError

      setEmail("")
      setOpen(false)
      router.refresh()
    } catch (error) {
      console.error("Error adding friend:", error)
      setError("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
          <UserPlus className="mr-2 h-4 w-4" />
          Add Friend
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add a Friend</DialogTitle>
          <DialogDescription>Enter your friend&apos;s User ID to send a friend request.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Friend&apos;s User ID</Label>
            <Input
              id="email"
              placeholder="Enter User ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
            >
              {isSubmitting ? "Sending..." : "Send Request"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
