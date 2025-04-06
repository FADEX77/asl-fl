import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { getUserTeam } from "@/app/actions/team-actions"
import { TeamBoosts } from "@/components/team-boosts"

export default async function BoostsPage() {
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
        <h1 className="text-3xl font-bold tracking-tight">Boosts</h1>
        <p className="text-muted-foreground">Use your boosts strategically to maximize your points.</p>
      </div>

      <TeamBoosts
        team={team}
        currentGameweek={currentGameweek}
        onBoostUsed={async () => {
          // This is a server component, so we can't directly update state
          // In a real app, you would use React Server Actions or client-side state management
        }}
      />
    </div>
  )
}

