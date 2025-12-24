import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { CopyButton } from "@/components/copy-button"

export default async function ProfilePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto p-4 md:p-6 max-w-2xl">
        <Link href="/app">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>

        <Card className="border-amber-200">
          <CardHeader>
            <CardTitle className="text-2xl text-amber-900">Your Profile</CardTitle>
            <CardDescription>Share your User ID with friends to connect</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-amber-700 mb-2">Display Name</h3>
              <p className="text-lg text-amber-900">{profile?.display_name}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-amber-700 mb-2">Email</h3>
              <p className="text-lg text-amber-900">{user.email}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-amber-700 mb-2">Your User ID</h3>
              <div className="flex items-center gap-2 bg-amber-50 p-3 rounded-lg border border-amber-200">
                <code className="flex-1 text-sm text-amber-900 break-all">{user.id}</code>
                <CopyButton textToCopy={user.id} />
              </div>
              <p className="text-xs text-amber-600 mt-2">Share this ID with friends so they can add you</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
