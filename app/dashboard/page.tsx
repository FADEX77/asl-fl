import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardCards } from "@/components/dashboard-cards"
import { TeamOverview } from "@/components/team-overview"
import { UpcomingFixtures } from "@/components/upcoming-fixtures"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  return (
    <div className="space-y-8">
      <DashboardHeader user={session?.user} />
      <DashboardCards />
      <div className="grid gap-8 md:grid-cols-2">
        <TeamOverview />
        <UpcomingFixtures />
      </div>
    </div>
  )
}

