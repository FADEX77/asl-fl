import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { PlayerForm } from "@/components/admin/player-form"

interface PlayerPageProps {
  params: {
    id: string
  }
}

export default async function AdminPlayerPage({ params }: PlayerPageProps) {
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/login")
  }

  const isNew = params.id === "new"

  let player = null
  if (!isNew) {
    player = await db.player.findUnique({
      where: {
        id: params.id,
      },
      include: {
        team: true,
      },
    })

    if (!player) {
      redirect("/admin/players")
    }
  }

  // Get all teams for the form
  const teams = await db.team.findMany({
    orderBy: {
      name: "asc",
    },
  })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{isNew ? "Add Player" : "Edit Player"}</h1>

      <PlayerForm player={player} teams={teams} />
    </div>
  )
}

