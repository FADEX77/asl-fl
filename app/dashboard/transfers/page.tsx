import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { getUserTeam } from "@/app/actions/team-actions"
import { TeamTransfers } from "@/components/team-transfers"

export default async function TransfersPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/login")
  }

  const team = await getUserTeam()

  if (!team) {
    redirect("/dashboard/team")
  }

  // In a real app, you would get the current gameweek from your database
  const currentGameweek = 1 // Hardcoded for demonstration

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Transfers</h1>
        <p className="text-muted-foreground">
          Make changes to your team. You have {team.transfers} transfers available.
        </p>
      </div>

      <TeamTransfers initialTeam={team} currentGameweek={currentGameweek} />
    </div>
  )
}

