import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 text-6xl">📧</div>
            <CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
            <CardDescription>
              We sent you a verification link. Click it to activate your account and meet your beaver!
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Once verified, you can log in and start building your habits.
            </p>
            <Link
              href="/auth/login"
              className="text-sm font-medium text-orange-600 hover:text-orange-700 underline underline-offset-4"
            >
              Back to login
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
