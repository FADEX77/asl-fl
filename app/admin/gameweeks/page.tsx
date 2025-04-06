import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { DataTable } from "@/components/admin/data-table"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default async function AdminGameweeksPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/login")
  }

  // Get gameweeks from database
  const gameweeks = await db.gameweek.findMany({
    orderBy: {
      number: "asc",
    },
  })

  // Format data for the table
  const formattedGameweeks = gameweeks.map((gameweek) => ({
    id: gameweek.id,
    number: gameweek.number,
    startDate: gameweek.startDate.toLocaleDateString(),
    endDate: gameweek.endDate.toLocaleDateString(),
    status: gameweek.isActive ? "Active" : gameweek.isCompleted ? "Completed" : "Upcoming",
  }))

  // Define columns for the table
  const columns = [
    {
      accessorKey: "number",
      header: "Gameweek",
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
    },
    {
      accessorKey: "endDate",
      header: "End Date",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status")
        return (
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${
              status === "Active"
                ? "bg-green-100 text-green-800"
                : status === "Completed"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {status}
          </div>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link href={`/admin/gameweeks/${row.original.id}`}>
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
        <h1 className="text-3xl font-bold">Gameweeks</h1>

        <Link href="/admin/gameweeks/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Gameweek
          </Button>
        </Link>
      </div>

      <DataTable columns={columns} data={formattedGameweeks} />
    </div>
  )
}

