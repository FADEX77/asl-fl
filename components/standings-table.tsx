import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export function StandingsTable() {
  const teams = [
    {
      name: "Computer Science",
      shortName: "CS",
      played: 6,
      won: 4,
      drawn: 1,
      lost: 1,
      goalsFor: 15,
      goalsAgainst: 7,
      points: 13,
    },
    {
      name: "Information Technology",
      shortName: "IT",
      played: 6,
      won: 3,
      drawn: 2,
      lost: 1,
      goalsFor: 12,
      goalsAgainst: 8,
      points: 11,
    },
    {
      name: "Accounting",
      shortName: "ACC",
      played: 6,
      won: 2,
      drawn: 1,
      lost: 3,
      goalsFor: 9,
      goalsAgainst: 11,
      points: 7,
    },
    {
      name: "Cybersecurity",
      shortName: "CYB",
      played: 6,
      won: 1,
      drawn: 0,
      lost: 5,
      goalsFor: 6,
      goalsAgainst: 16,
      points: 3,
    },
  ]

  const managers = [
    {
      rank: 1,
      name: "Alex Johnson",
      teamName: "Tech Titans",
      gameweek: 65,
      total: 854,
    },
    {
      rank: 2,
      name: "Maria Garcia",
      teamName: "Code Crushers",
      gameweek: 62,
      total: 842,
    },
    {
      rank: 3,
      name: "James Wilson",
      teamName: "Binary Beasts",
      gameweek: 58,
      total: 830,
    },
    {
      rank: 4,
      name: "Sarah Thompson",
      teamName: "Data Dominators",
      gameweek: 55,
      total: 825,
    },
    {
      rank: 5,
      name: "David Lee",
      teamName: "Algorithm Aces",
      gameweek: 52,
      total: 810,
    },
    {
      rank: 6,
      name: "Emily Chen",
      teamName: "Syntax Stars",
      gameweek: 50,
      total: 795,
    },
    {
      rank: 7,
      name: "Michael Brown",
      teamName: "Firewall FC",
      gameweek: 48,
      total: 782,
    },
    {
      rank: 8,
      name: "Jessica Martinez",
      teamName: "Query Queens",
      gameweek: 45,
      total: 770,
    },
    {
      rank: 9,
      name: "Daniel Smith",
      teamName: "Debuggers United",
      gameweek: 42,
      total: 765,
    },
    {
      rank: 10,
      name: "Sophia Kim",
      teamName: "Pixel Pirates",
      gameweek: 40,
      total: 750,
    },
  ]

  return (
    <Tabs defaultValue="teams">
      <TabsList className="grid w-full grid-cols-2 mb-4">
        <TabsTrigger value="teams">Teams</TabsTrigger>
        <TabsTrigger value="managers">Managers</TabsTrigger>
      </TabsList>

      <TabsContent value="teams">
        <Card>
          <CardHeader>
            <CardTitle>Team Standings</CardTitle>
            <CardDescription>Current league table for the All Stars League teams</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Pos</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead className="text-center">P</TableHead>
                  <TableHead className="text-center">W</TableHead>
                  <TableHead className="text-center">D</TableHead>
                  <TableHead className="text-center">L</TableHead>
                  <TableHead className="text-center">GF</TableHead>
                  <TableHead className="text-center">GA</TableHead>
                  <TableHead className="text-center">GD</TableHead>
                  <TableHead className="text-center">Pts</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teams.map((team, index) => (
                  <TableRow key={team.name}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="h-8 w-8 rounded-full overflow-hidden">
                          <Image
                            src={team.logoUrl || `/images/teams/${team.shortName.toLowerCase()}.png`}
                            alt={team.name}
                            width={32}
                            height={32}
                            className="object-contain"
                          />
                        </div>
                        <span>{team.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{team.played}</TableCell>
                    <TableCell className="text-center">{team.won}</TableCell>
                    <TableCell className="text-center">{team.drawn}</TableCell>
                    <TableCell className="text-center">{team.lost}</TableCell>
                    <TableCell className="text-center">{team.goalsFor}</TableCell>
                    <TableCell className="text-center">{team.goalsAgainst}</TableCell>
                    <TableCell className="text-center">{team.goalsFor - team.goalsAgainst}</TableCell>
                    <TableCell className="text-center font-bold">{team.points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="managers">
        <Card>
          <CardHeader>
            <CardTitle>Manager Rankings</CardTitle>
            <CardDescription>Top fantasy managers in the All Stars League</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Rank</TableHead>
                  <TableHead>Manager</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead className="text-center">GW</TableHead>
                  <TableHead className="text-center">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {managers.map((manager) => (
                  <TableRow key={manager.name}>
                    <TableCell className="font-medium">{manager.rank}</TableCell>
                    <TableCell>{manager.name}</TableCell>
                    <TableCell>{manager.teamName}</TableCell>
                    <TableCell className="text-center">{manager.gameweek}</TableCell>
                    <TableCell className="text-center font-bold">{manager.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

