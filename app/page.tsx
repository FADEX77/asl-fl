import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { HomeHero } from "@/components/home-hero"
import { HomeFeatures } from "@/components/home-features"
import { HomeStats } from "@/components/home-stats"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { TeamsShowcase } from "@/components/teams-showcase"

export default async function Home() {
  const session = await getServerSession(authOptions)

  // If user is logged in, redirect to dashboard
  if (session) {
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <MainNav />
      </header>
      <main className="flex-1">
        <HomeHero />
        <HomeFeatures />
        <TeamsShowcase />
        <HomeStats />
      </main>
      <Footer />
    </div>
  )
}

