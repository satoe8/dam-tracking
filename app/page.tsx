import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Users, Sparkles } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        <nav className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-2">
            <span className="text-4xl">🦫</span>
            <h1 className="text-2xl font-bold text-amber-900">Beaver Habits</h1>
          </div>
          <div className="flex gap-3">
            <Link href="/auth/login">
              <Button variant="outline" className="border-amber-300 bg-transparent">
                Log in
              </Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                Get Started
              </Button>
            </Link>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="mb-8 animate-bounce-slow inline-block">
            <span className="text-9xl">🦫</span>
          </div>
          <h2 className="text-5xl font-bold text-amber-900 mb-6 text-balance">
            Build Better Habits with Your Beaver Buddy
          </h2>
          <p className="text-xl text-amber-700 mb-8 text-pretty leading-relaxed">
            Track your daily habits and watch your pet beaver thrive. The more consistent you are, the happier your
            beaver becomes. Connect with friends and motivate each other!
          </p>
          <Link href="/auth/sign-up">
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-lg px-8 py-6"
            >
              Start Your Journey
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto mb-16">
          <Card className="border-amber-200 bg-white">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-amber-900 mb-2">Track Habits</h3>
              <p className="text-sm text-amber-700 leading-relaxed">
                Create daily or weekly habits and mark them complete. Each completion boosts your beaver's energy!
              </p>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-white">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-amber-900 mb-2">Watch Your Beaver</h3>
              <p className="text-sm text-amber-700 leading-relaxed">
                Your beaver's mood and energy reflect your progress. Keep them happy by staying consistent!
              </p>
            </CardContent>
          </Card>

          <Card className="border-amber-200 bg-white">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-amber-900 mb-2">Connect with Friends</h3>
              <p className="text-sm text-amber-700 leading-relaxed">
                Add friends to see their beavers and motivate each other to build better habits together!
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-amber-200 bg-gradient-to-br from-white to-amber-50 max-w-3xl mx-auto">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-amber-900 mb-4">How It Works</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">1️⃣</span>
                    <div>
                      <p className="font-semibold text-amber-900">Create Your Habits</p>
                      <p className="text-sm text-amber-700">Set up the habits you want to track daily or weekly</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">2️⃣</span>
                    <div>
                      <p className="font-semibold text-amber-900">Complete & Celebrate</p>
                      <p className="text-sm text-amber-700">Mark habits complete and watch the confetti fly!</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-2xl">3️⃣</span>
                    <div>
                      <p className="font-semibold text-amber-900">Watch Your Beaver Grow</p>
                      <p className="text-sm text-amber-700">
                        Your beaver gains energy and becomes happier with each habit
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="text-8xl animate-bounce-slow">🦫</div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-16">
          <p className="text-amber-600 mb-4">Ready to build better habits?</p>
          <Link href="/auth/sign-up">
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
            >
              Get Your Beaver
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
