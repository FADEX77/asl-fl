import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Trophy, Calendar, BarChart3 } from "lucide-react"

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)

  if (!session?.user || session.user.role !== "ADMIN") {
    redirect("/login")
  }

  // Get counts from database
  const userCount = await db.user.count()
  const teamCount = await db.team.count()
  const playerCount = await db.player.count()
  const gameweekCount = await db.gameweek.count()

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userCount}</div>
            <p className="text-xs text-muted-foreground">Registered accounts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Teams</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamCount}</div>
            <p className="text-xs text-muted-foreground">Department teams</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Players</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{playerCount}</div>
            <p className="text-xs text-muted-foreground">Total players</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gameweeks</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{gameweekCount}</div>
            <p className="text-xs text-muted-foreground">Total gameweeks</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-blue-100 p-2">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">New user registered</p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-green-100 p-2">
                  <Trophy className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Gameweek completed</p>
                  <p className="text-xs text-muted-foreground">3 hours ago</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="mr-4 rounded-full bg-yellow-100 p-2">
                  <BarChart3 className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Player stats updated</p>
                  <p className="text-xs text-muted-foreground">5 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-4 h-2 w-2 rounded-full bg-green-500"></div>
                  <p className="text-sm font-medium">Database</p>
                </div>
                <p className="text-xs text-muted-foreground">Operational</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-4 h-2 w-2 rounded-full bg-green-500"></div>
                  <p className="text-sm font-medium">Authentication</p>
                </div>
                <p className="text-xs text-muted-foreground">Operational</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-4 h-2 w-2 rounded-full bg-green-500"></div>
                  <p className="text-sm font-medium">API</p>
                </div>
                <p className="text-xs text-muted-foreground">Operational</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-4 h-2 w-2 rounded-full bg-green-500"></div>
                  <p className="text-sm font-medium">Email Service</p>
                </div>
                <p className="text-xs text-muted-foreground">Operational</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

