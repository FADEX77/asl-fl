import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { DataTable } from "@/components/admin/data-table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default async function AdminPlayersPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/login")
  }

  // Get players from database
  const players = await db.player.findMany({
    include: {
      team: true,
    },
    orderBy: {
      name: "asc",
    },
  })

  // Format data for the table
  const formattedPlayers = players.map((player) => ({
    id: player.id,
    name: player.name,
    position: player.position,
    team: player.team.name,
    price: `£${player.price.toFixed(1)}m`,
    points: player.points,
  }))

  // Define columns for the table
  const columns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "position",
      header: "Position",
    },
    {
      accessorKey: "team",
      header: "Team",
    },
    {
      accessorKey: "price",
      header: "Price",
    },
    {
      accessorKey: "points",
      header: "Points",
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link href={`/admin/players/${row.original.id}`}>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </Link>
          <Button variant="destructive" size="sm">
            Delete
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Players</h1>

        <Link href="/admin/players/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Player
          </Button>
        </Link>
      </div>

      <DataTable columns={columns} data={formattedPlayers} />
    </div>
  )
}

