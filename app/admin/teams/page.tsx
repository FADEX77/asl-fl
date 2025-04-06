import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { DataTable } from "@/components/admin/data-table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default async function AdminTeamsPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/login")
  }

  // Get teams from database
  const teams = await db.team.findMany({
    include: {
      players: true,
    },
    orderBy: {
      name: "asc",
    },
  })

  // Format data for the table
  const formattedTeams = teams.map((team) => ({
    id: team.id,
    name: team.name,
    shortName: team.shortName,
    playerCount: team.players.length,
  }))

  // Define columns for the table
  const columns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "shortName",
      header: "Short Name",
    },
    {
      accessorKey: "playerCount",
      header: "Players",
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link href={`/admin/teams/${row.original.id}`}>
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
        <h1 className="text-3xl font-bold">Teams</h1>

        <Link href="/admin/teams/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Team
          </Button>
        </Link>
      </div>

      <DataTable columns={columns} data={formattedTeams} />
    </div>
  )
}

