import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { FriendsList } from "@/components/friends-list"
import { AddFriendDialog } from "@/components/add-friend-dialog"
import { FriendRequests } from "@/components/friend-requests"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function FriendsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get accepted friends
  const { data: friendships } = await supabase
    .from("friends")
    .select(
      `
      id,
      user_id,
      friend_id,
      status,
      profiles!friends_friend_id_fkey(id, display_name),
      beaver_stats!friends_friend_id_fkey(energy, mood)
    `,
    )
    .eq("user_id", user.id)
    .eq("status", "accepted")

  // Get pending requests sent to me
  const { data: pendingRequests } = await supabase
    .from("friends")
    .select(
      `
      id,
      user_id,
      friend_id,
      profiles!friends_user_id_fkey(id, display_name)
    `,
    )
    .eq("friend_id", user.id)
    .eq("status", "pending")

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto p-4 md:p-6 max-w-4xl">
        <div className="mb-6">
          <Link href="/app">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-amber-900">Friends</h1>
              <p className="text-sm text-amber-700 mt-1">Connect with friends and see their beavers</p>
            </div>
            <AddFriendDialog userId={user.id} />
          </div>
        </div>

        {pendingRequests && pendingRequests.length > 0 && (
          <div className="mb-6">
            <FriendRequests requests={pendingRequests} />
          </div>
        )}

        <FriendsList friends={friendships || []} userId={user.id} />
      </div>
    </div>
  )
}
