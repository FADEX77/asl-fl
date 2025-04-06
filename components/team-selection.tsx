"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { allPlayers, type Player, type Position, type Team } from "@/lib/players-data"
import { type UserTeam, createInitialTeam } from "@/lib/fantasy-types"
import { saveUserTeam, getUserTeam } from "@/app/actions/team-actions"
// Add import for Image
import Image from "next/image"

export function TeamSelection() {
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState<Position>("Goalkeeper")
  const [searchQuery, setSearchQuery] = useState("")
  const [teamFilter, setTeamFilter] = useState<"All" | Team>("All")
  const [isLoading, setIsLoading] = useState(false)
  const [userTeam, setUserTeam] = useState<UserTeam | null>(null)
  const [teamName, setTeamName] = useState("My Team")
  const [captain, setCaptain] = useState<string>("")
  const [viceCaptain, setViceCaptain] = useState<string>("")

  // Initialize user team
  useEffect(() => {
    const fetchUserTeam = async () => {
      if (session?.user?.id) {
        const team = await getUserTeam()
        if (team) {
          setUserTeam(team)
          setTeamName(team.teamName)
          setCaptain(team.captain)
          setViceCaptain(team.viceCaptain)
        } else {
          setUserTeam(createInitialTeam(session.user.id))
        }
      }
    }

    fetchUserTeam()
  }, [session])

  if (!userTeam) {
    return <div>Loading...</div>
  }

  const handlePlayerSelection = (player: Player) => {
    // Check if player is already selected
    const isSelected = userTeam.players.some((p) => p.id === player.id)

    if (isSelected) {
      // Remove player from selection
      const updatedPlayers = userTeam.players.filter((p) => p.id !== player.id)
      const updatedStarters = userTeam.starters.filter((id) => id !== player.id)
      let updatedCaptain = userTeam.captain
      let updatedViceCaptain = userTeam.viceCaptain

      if (userTeam.captain === player.id) {
        updatedCaptain = ""
      }

      if (userTeam.viceCaptain === player.id) {
        updatedViceCaptain = ""
      }

      setUserTeam({
        ...userTeam,
        players: updatedPlayers,
        starters: updatedStarters,
        captain: updatedCaptain,
        viceCaptain: updatedViceCaptain,
        budget: userTeam.budget + player.price,
      })
    } else {
      // Check if we can add this player

      // Check if we have 15 players already
      if (userTeam.players.length >= 15) {
        toast({
          title: "Squad Full",
          description: "You can only select 15 players in total",
          variant: "destructive",
        })
        return
      }

      // Check team limit (max 4 from any team)
      const teamCount = userTeam.players.filter((p) => p.team === player.team).length
      if (teamCount >= 4) {
        toast({
          title: "Team Limit Reached",
          description: `You can only select 4 players from ${player.team}`,
          variant: "destructive",
        })
        return
      }

      // Check position limits
      const positionCount = userTeam.players.filter((p) => p.position === player.position).length
      const maxPerPosition: Record<Position, number> = {
        Goalkeeper: 2,
        Defender: 5,
        Midfielder: 5,
        Forward: 3,
      }

      if (positionCount >= maxPerPosition[player.position]) {
        toast({
          title: "Position Limit Reached",
          description: `You can only select ${maxPerPosition[player.position]} ${player.position}s`,
          variant: "destructive",
        })
        return
      }

      // Check budget
      if (userTeam.budget < player.price) {
        toast({
          title: "Insufficient Budget",
          description: `You need ${player.price - userTeam.budget}m more to buy this player`,
          variant: "destructive",
        })
        return
      }

      // Add player to selection
      const updatedPlayers = [...userTeam.players, player]

      // If this is the first goalkeeper or we have less than 11 players, add to starters
      const updatedStarters = [...userTeam.starters]
      if (
        (player.position === "Goalkeeper" &&
          !updatedPlayers.some((p) => p.position === "Goalkeeper" && userTeam.starters.includes(p.id))) ||
        userTeam.starters.length < 11
      ) {
        updatedStarters.push(player.id)
      }

      setUserTeam({
        ...userTeam,
        players: updatedPlayers,
        starters: updatedStarters,
        budget: userTeam.budget - player.price,
      })
    }
  }

  const toggleStarter = (playerId: string) => {
    const player = userTeam.players.find((p) => p.id === playerId)
    if (!player) return

    const isStarter = userTeam.starters.includes(playerId)

    if (isStarter) {
      // Check if we have enough players in this position
      const position = player.position
      const positionStarters = userTeam.players.filter(
        (p) => p.position === position && userTeam.starters.includes(p.id),
      )

      const minPerPosition: Record<Position, number> = {
        Goalkeeper: 1,
        Defender: 3,
        Midfielder: 3,
        Forward: 1,
      }

      if (positionStarters.length <= minPerPosition[position]) {
        toast({
          title: "Cannot Remove Starter",
          description: `You need at least ${minPerPosition[position]} ${position}(s) in your starting lineup`,
          variant: "destructive",
        })
        return
      }

      // Remove from starters
      setUserTeam({
        ...userTeam,
        starters: userTeam.starters.filter((id) => id !== playerId),
      })
    } else {
      // Check if we already have 11 starters
      if (userTeam.starters.length >= 11) {
        toast({
          title: "Starting Lineup Full",
          description: "You can only have 11 players in your starting lineup",
          variant: "destructive",
        })
        return
      }

      // Add to starters
      setUserTeam({
        ...userTeam,
        starters: [...userTeam.starters, playerId],
      })
    }
  }

  const setCaptainPlayer = (playerId: string) => {
    // Can only set captain from starters
    if (!userTeam.starters.includes(playerId)) {
      toast({
        title: "Invalid Captain",
        description: "Captain must be in your starting lineup",
        variant: "destructive",
      })
      return
    }

    // If this player is already vice-captain, remove them from that role
    if (userTeam.viceCaptain === playerId) {
      setViceCaptain("")
    }

    setCaptain(playerId)
  }

  const setViceCaptainPlayer = (playerId: string) => {
    // Can only set vice-captain from starters
    if (!userTeam.starters.includes(playerId)) {
      toast({
        title: "Invalid Vice Captain",
        description: "Vice Captain must be in your starting lineup",
        variant: "destructive",
      })
      return
    }

    // If this player is already captain, remove them from that role
    if (userTeam.captain === playerId) {
      toast({
        title: "Invalid Vice Captain",
        description: "Vice Captain cannot be the same as Captain",
      })
      return
    }

    setViceCaptain(playerId)
  }

  const handleSaveTeam = async () => {
    if (!session?.user?.id) {
      toast({
        title: "Not Logged In",
        description: "You must be logged in to save your team",
        variant: "destructive",
      })
      return
    }

    // Validate team
    if (userTeam.players.length !== 15) {
      toast({
        title: "Incomplete Squad",
        description: `You need 15 players (currently have ${userTeam.players.length})`,
        variant: "destructive",
      })
      return
    }

    if (userTeam.starters.length !== 11) {
      toast({
        title: "Invalid Starting Lineup",
        description: `You need 11 starters (currently have ${userTeam.starters.length})`,
        variant: "destructive",
      })
      return
    }

    if (!captain) {
      toast({
        title: "No Captain Selected",
        description: "You must select a captain from your starting lineup",
        variant: "destructive",
      })
      return
    }

    if (!viceCaptain) {
      toast({
        title: "No Vice Captain Selected",
        description: "You must select a vice captain from your starting lineup",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Calculate total points
      const totalPoints = userTeam.players.reduce((sum, player) => sum + player.points, 0)

      // Save team
      await saveUserTeam({
        ...userTeam,
        teamName,
        captain,
        viceCaptain,
        totalPoints,
      })

      toast({
        title: "Team Saved",
        description: "Your team has been saved successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save your team. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Filter players based on position, team, and search query
  const filteredPlayers = allPlayers.filter((player) => {
    const matchesPosition = player.position === activeTab
    const matchesTeam = teamFilter === "All" || player.team === teamFilter
    const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesPosition && matchesTeam && matchesSearch
  })

  const teamColors: Record<Team, string> = {
    "Computer Science": "bg-blue-100 text-blue-800",
    "Information Technology": "bg-green-100 text-green-800",
    Accounting: "bg-yellow-100 text-yellow-800",
    Cybersecurity: "bg-red-100 text-red-800",
  }

  // Get players by position for the pitch display
  const getPlayersByPositionFromTeam = (position: Position) => {
    return userTeam.players.filter((player) => player.position === position && userTeam.starters.includes(player.id))
  }

  // Get substitute players
  const getSubstitutes = () => {
    return userTeam.players.filter((player) => !userTeam.starters.includes(player.id))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Team Setup</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <Label htmlFor="team-name">Team Name</Label>
                      <Input
                        id="team-name"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        className="max-w-xs"
                      />
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">Budget: £{userTeam.budget.toFixed(1)}m</p>
                      <p className="text-xs text-muted-foreground">Players: {userTeam.players.length}/15</p>
                    </div>
                  </div>

                  <div className="relative h-[400px] w-full bg-gradient-to-b from-green-800 to-green-600 rounded-md overflow-hidden">
                    {/* Field markings */}
                    <div className="absolute inset-0 flex flex-col">
                      <div className="h-1/2 border-b-2 border-white/50 flex items-end justify-center pb-4">
                        <div className="w-[150px] h-[60px] border-2 border-white/50 rounded-md"></div>
                      </div>
                      <div className="h-1/2 flex items-start justify-center pt-4">
                        <div className="w-[150px] h-[60px] border-2 border-white/50 rounded-md"></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-[150px] h-[150px] border-2 border-white/50 rounded-full"></div>
                      </div>
                    </div>

                    {/* Players */}
                    <div className="absolute inset-0 flex flex-col">
                      {/* Goalkeeper */}
                      <div className="h-[15%] flex justify-center items-center">
                        {getPlayersByPositionFromTeam("Goalkeeper").map((player) => (
                          <div
                            key={player.id}
                            className="flex flex-col items-center cursor-pointer"
                            onClick={() => toggleStarter(player.id)}
                          >
                            {/* Update the Avatar component to show team logos */}
                            <Avatar
                              className={`h-12 w-12 border-2 ${captain === player.id ? "border-yellow-400" : viceCaptain === player.id ? "border-blue-400" : "border-white"}`}
                            >
                              <div className="relative w-full h-full">
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
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <AvatarFallback className={`${teamColors[player.team].split(" ")[0]}`}>
                                {player.name.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-white mt-1">
                              {player.name}
                              {captain === player.id && " (C)"}
                              {viceCaptain === player.id && " (VC)"}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Defenders */}
                      <div className="h-[25%] flex justify-around items-center">
                        {getPlayersByPositionFromTeam("Defender").map((player) => (
                          <div
                            key={player.id}
                            className="flex flex-col items-center cursor-pointer"
                            onClick={() => toggleStarter(player.id)}
                          >
                            {/* Update the Avatar component to show team logos */}
                            <Avatar
                              className={`h-12 w-12 border-2 ${captain === player.id ? "border-yellow-400" : viceCaptain === player.id ? "border-blue-400" : "border-white"}`}
                            >
                              <div className="relative w-full h-full">
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
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <AvatarFallback className={`${teamColors[player.team].split(" ")[0]}`}>
                                {player.name.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-white mt-1">
                              {player.name}
                              {captain === player.id && " (C)"}
                              {viceCaptain === player.id && " (VC)"}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Midfielders */}
                      <div className="h-[30%] flex justify-around items-center">
                        {getPlayersByPositionFromTeam("Midfielder").map((player) => (
                          <div
                            key={player.id}
                            className="flex flex-col items-center cursor-pointer"
                            onClick={() => toggleStarter(player.id)}
                          >
                            {/* Update the Avatar component to show team logos */}
                            <Avatar
                              className={`h-12 w-12 border-2 ${captain === player.id ? "border-yellow-400" : viceCaptain === player.id ? "border-blue-400" : "border-white"}`}
                            >
                              <div className="relative w-full h-full">
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
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <AvatarFallback className={`${teamColors[player.team].split(" ")[0]}`}>
                                {player.name.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-white mt-1">
                              {player.name}
                              {captain === player.id && " (C)"}
                              {viceCaptain === player.id && " (VC)"}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Forwards */}
                      <div className="h-[30%] flex justify-around items-center">
                        {getPlayersByPositionFromTeam("Forward").map((player) => (
                          <div
                            key={player.id}
                            className="flex flex-col items-center cursor-pointer"
                            onClick={() => toggleStarter(player.id)}
                          >
                            {/* Update the Avatar component to show team logos */}
                            <Avatar
                              className={`h-12 w-12 border-2 ${captain === player.id ? "border-yellow-400" : viceCaptain === player.id ? "border-blue-400" : "border-white"}`}
                            >
                              <div className="relative w-full h-full">
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
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <AvatarFallback className={`${teamColors[player.team].split(" ")[0]}`}>
                                {player.name.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-white mt-1">
                              {player.name}
                              {captain === player.id && " (C)"}
                              {viceCaptain === player.id && " (VC)"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Substitutes */}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Substitutes</h3>
                    <div className="flex flex-wrap gap-2">
                      {getSubstitutes().map((player) => (
                        <div
                          key={player.id}
                          className="flex items-center gap-2 p-2 border rounded-md cursor-pointer hover:bg-muted"
                          onClick={() => toggleStarter(player.id)}
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className={`${teamColors[player.team].split(" ")[0]}`}>
                              {player.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{player.name}</p>
                            <p className="text-xs text-muted-foreground">{player.position}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Captain and Vice Captain Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Captain</h3>
                      <Select value={captain} onValueChange={setCaptainPlayer}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a captain" />
                        </SelectTrigger>
                        <SelectContent>
                          {userTeam.players
                            .filter((player) => userTeam.starters.includes(player.id))
                            .map((player) => (
                              <SelectItem key={player.id} value={player.id}>
                                {player.name} ({player.position})
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-1">Captain gets 2x points</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Vice Captain</h3>
                      <Select value={viceCaptain} onValueChange={setViceCaptainPlayer}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a vice captain" />
                        </SelectTrigger>
                        <SelectContent>
                          {userTeam.players
                            .filter((player) => userTeam.starters.includes(player.id) && player.id !== captain)
                            .map((player) => (
                              <SelectItem key={player.id} value={player.id}>
                                {player.name} ({player.position})
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-1">Vice Captain gets 2 additional points</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Player Selection */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Player Selection</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs defaultValue="Goalkeeper" onValueChange={(value) => setActiveTab(value as Position)}>
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="Goalkeeper">GK</TabsTrigger>
                  <TabsTrigger value="Defender">DEF</TabsTrigger>
                  <TabsTrigger value="Midfielder">MID</TabsTrigger>
                  <TabsTrigger value="Forward">FWD</TabsTrigger>
                </TabsList>

                <div className="flex flex-col space-y-4 mb-4">
                  <Input
                    placeholder="Search players..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />

                  <Select value={teamFilter} onValueChange={(value) => setTeamFilter(value as "All" | Team)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by team" />
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

                <TabsContent value={activeTab}>
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-2">
                      {filteredPlayers.map((player) => {
                        const isSelected = userTeam.players.some((p) => p.id === player.id)
                        return (
                          <div
                            key={player.id}
                            className={`p-3 rounded-md border flex justify-between items-center cursor-pointer transition-colors ${isSelected ? "bg-pink-50 border-pink-200" : "hover:bg-muted"}`}
                            onClick={() => handlePlayerSelection(player)}
                          >
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback className={`${teamColors[player.team].split(" ")[0]}`}>
                                  {player.name.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">{player.name}</p>
                                <div className="flex items-center space-x-2">
                                  <Badge variant="outline" className={teamColors[player.team]}>
                                    {player.team}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">£{player.price}m</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center space-x-1 rounded-md bg-pink-100 px-2 py-1 text-xs font-medium text-pink-600">
                                <span>{player.points}</span>
                                <span>pts</span>
                              </div>
                              {isSelected && (
                                <div className="rounded-full bg-pink-500 text-white p-1">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                  </svg>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end">
        <Button size="lg" onClick={handleSaveTeam} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Team"}
        </Button>
      </div>
    </div>
  )
}

