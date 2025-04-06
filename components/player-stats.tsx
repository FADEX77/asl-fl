"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
// Add import for Image
import Image from "next/image"

type Position = "All" | "Goalkeeper" | "Defender" | "Midfielder" | "Forward"
type Team = "All" | "Computer Science" | "Information Technology" | "Accounting" | "Cybersecurity"

interface Player {
  id: string
  name: string
  position: Exclude<Position, "All">
  team: Exclude<Team, "All">
  goals: number
  assists: number
  cleanSheets: number
  points: number
}

export function PlayerStats() {
  const [positionFilter, setPositionFilter] = useState<Position>("All")
  const [teamFilter, setTeamFilter] = useState<Team>("All")
  const [searchQuery, setSearchQuery] = useState("")

  // Sample player data
  const players: Player[] = [
    // Forwards
    {
      id: "p1",
      name: "Jacob Young",
      position: "Forward",
      team: "Computer Science",
      goals: 12,
      assists: 3,
      cleanSheets: 0,
      points: 75,
    },
    {
      id: "p2",
      name: "Amelia King",
      position: "Forward",
      team: "Computer Science",
      goals: 9,
      assists: 5,
      cleanSheets: 0,
      points: 70,
    },
    {
      id: "p3",
      name: "Matthew Scott",
      position: "Forward",
      team: "Information Technology",
      goals: 8,
      assists: 6,
      cleanSheets: 0,
      points: 68,
    },
    {
      id: "p4",
      name: "Abigail Green",
      position: "Forward",
      team: "Information Technology",
      goals: 7,
      assists: 4,
      cleanSheets: 0,
      points: 65,
    },
    {
      id: "p5",
      name: "Lucas Baker",
      position: "Forward",
      team: "Accounting",
      goals: 6,
      assists: 7,
      cleanSheets: 0,
      points: 62,
    },
    {
      id: "p6",
      name: "Harper Adams",
      position: "Forward",
      team: "Accounting",
      goals: 5,
      assists: 5,
      cleanSheets: 0,
      points: 58,
    },
    {
      id: "p7",
      name: "Samuel Nelson",
      position: "Forward",
      team: "Cybersecurity",
      goals: 4,
      assists: 6,
      cleanSheets: 0,
      points: 55,
    },
    {
      id: "p8",
      name: "Ella Carter",
      position: "Forward",
      team: "Cybersecurity",
      goals: 3,
      assists: 4,
      cleanSheets: 0,
      points: 50,
    },

    // Midfielders
    {
      id: "p9",
      name: "William Anderson",
      position: "Midfielder",
      team: "Computer Science",
      goals: 6,
      assists: 8,
      cleanSheets: 0,
      points: 60,
    },
    {
      id: "p10",
      name: "Emily Thomas",
      position: "Midfielder",
      team: "Computer Science",
      goals: 5,
      assists: 7,
      cleanSheets: 0,
      points: 55,
    },
    {
      id: "p11",
      name: "Alexander White",
      position: "Midfielder",
      team: "Information Technology",
      goals: 4,
      assists: 6,
      cleanSheets: 0,
      points: 52,
    },
    {
      id: "p12",
      name: "Ava Harris",
      position: "Midfielder",
      team: "Information Technology",
      goals: 3,
      assists: 5,
      cleanSheets: 0,
      points: 48,
    },
    {
      id: "p13",
      name: "Benjamin Clark",
      position: "Midfielder",
      team: "Accounting",
      goals: 2,
      assists: 4,
      cleanSheets: 0,
      points: 45,
    },
    {
      id: "p14",
      name: "Mia Lewis",
      position: "Midfielder",
      team: "Accounting",
      goals: 1,
      assists: 3,
      cleanSheets: 0,
      points: 42,
    },
    {
      id: "p15",
      name: "Ethan Walker",
      position: "Midfielder",
      team: "Cybersecurity",
      goals: 0,
      assists: 2,
      cleanSheets: 0,
      points: 38,
    },
    {
      id: "p16",
      name: "Charlotte Hall",
      position: "Midfielder",
      team: "Cybersecurity",
      goals: 0,
      assists: 1,
      cleanSheets: 0,
      points: 35,
    },

    // Defenders
    {
      id: "p17",
      name: "John Smith",
      position: "Defender",
      team: "Computer Science",
      goals: 2,
      assists: 1,
      cleanSheets: 4,
      points: 45,
    },
    {
      id: "p18",
      name: "Lisa Johnson",
      position: "Defender",
      team: "Computer Science",
      goals: 1,
      assists: 2,
      cleanSheets: 4,
      points: 40,
    },
    {
      id: "p19",
      name: "Robert Kim",
      position: "Defender",
      team: "Information Technology",
      goals: 1,
      assists: 1,
      cleanSheets: 3,
      points: 38,
    },
    {
      id: "p20",
      name: "Jessica Brown",
      position: "Defender",
      team: "Information Technology",
      goals: 0,
      assists: 2,
      cleanSheets: 3,
      points: 35,
    },
    {
      id: "p21",
      name: "Daniel Martinez",
      position: "Defender",
      team: "Accounting",
      goals: 0,
      assists: 1,
      cleanSheets: 2,
      points: 30,
    },
    {
      id: "p22",
      name: "Sophia Wilson",
      position: "Defender",
      team: "Accounting",
      goals: 0,
      assists: 0,
      cleanSheets: 2,
      points: 25,
    },
    {
      id: "p23",
      name: "James Taylor",
      position: "Defender",
      team: "Cybersecurity",
      goals: 0,
      assists: 0,
      cleanSheets: 1,
      points: 28,
    },
    {
      id: "p24",
      name: "Olivia Davis",
      position: "Defender",
      team: "Cybersecurity",
      goals: 0,
      assists: 0,
      cleanSheets: 1,
      points: 22,
    },

    // Goalkeepers
    {
      id: "p25",
      name: "David Lee",
      position: "Goalkeeper",
      team: "Computer Science",
      goals: 0,
      assists: 0,
      cleanSheets: 4,
      points: 32,
    },
    {
      id: "p26",
      name: "Sarah Chen",
      position: "Goalkeeper",
      team: "Information Technology",
      goals: 0,
      assists: 0,
      cleanSheets: 3,
      points: 28,
    },
    {
      id: "p27",
      name: "Michael Wong",
      position: "Goalkeeper",
      team: "Accounting",
      goals: 0,
      assists: 0,
      cleanSheets: 2,
      points: 25,
    },
    {
      id: "p28",
      name: "Emma Garcia",
      position: "Goalkeeper",
      team: "Cybersecurity",
      goals: 0,
      assists: 0,
      cleanSheets: 5,
      points: 20,
    },
  ]

  // Filter players based on position, team, and search query
  const filteredPlayers = players.filter((player) => {
    const matchesPosition = positionFilter === "All" || player.position === positionFilter
    const matchesTeam = teamFilter === "All" || player.team === teamFilter
    const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesPosition && matchesTeam && matchesSearch
  })

  // Sort players by points (descending)
  const sortedPlayers = [...filteredPlayers].sort((a, b) => b.points - a.points)

  const teamColors: Record<Exclude<Team, "All">, string> = {
    "Computer Science": "bg-blue-100 text-blue-800",
    "Information Technology": "bg-green-100 text-green-800",
    Accounting: "bg-yellow-100 text-yellow-800",
    Cybersecurity: "bg-red-100 text-red-800",
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Player Statistics</CardTitle>
        <CardDescription>View and filter player statistics from all teams</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search players..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-4">
            <Select value={positionFilter} onValueChange={(value) => setPositionFilter(value as Position)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Positions</SelectItem>
                <SelectItem value="Goalkeeper">Goalkeeper</SelectItem>
                <SelectItem value="Defender">Defender</SelectItem>
                <SelectItem value="Midfielder">Midfielder</SelectItem>
                <SelectItem value="Forward">Forward</SelectItem>
              </SelectContent>
            </Select>
            <Select value={teamFilter} onValueChange={(value) => setTeamFilter(value as Team)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Teams</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Information Technology">Information Technology</SelectItem>
                <SelectItem value="Accounting">Accounting</SelectItem>
                <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Rank</TableHead>
              <TableHead>Player</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Team</TableHead>
              <TableHead className="text-center">Goals</TableHead>
              <TableHead className="text-center">Assists</TableHead>
              <TableHead className="text-center">Clean Sheets</TableHead>
              <TableHead className="text-center">Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPlayers.map((player, index) => (
              <TableRow key={player.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{player.name}</TableCell>
                <TableCell>{player.position}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <div className="h-6 w-6 rounded-full overflow-hidden">
                      <Image
                        src={`/images/teams/${
                          player.team === "Computer Science"
                            ? "cmp"
                            : player.team === "Information Technology"
                              ? "ift"
                              : player.team === "Accounting"
                                ? "acc"
                                : "cyb"
                        }.png`}
                        alt={player.team}
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    </div>
                    <Badge variant="outline" className={teamColors[player.team]}>
                      {player.team}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="text-center">{player.goals}</TableCell>
                <TableCell className="text-center">{player.assists}</TableCell>
                <TableCell className="text-center">{player.cleanSheets}</TableCell>
                <TableCell className="text-center font-bold">{player.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

