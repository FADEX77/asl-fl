import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { LoginForm } from "@/components/login-form"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"

export default async function LoginPage() {
  const session = await getServerSession(authOptions)

  // If user is already logged in, redirect to dashboard
  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <MainNav />
      </header>
      <main className="flex-1 flex items-center justify-center">
        <LoginForm />
      </main>
      <Footer />
    </div>
  )
}

