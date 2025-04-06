"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/components/ui/use-toast"
import { allPlayers, type Player, type Position, type Team } from "@/lib/players-data"
import type { UserTeam } from "@/lib/fantasy-types"
import { makeTransfers, getUserTeam } from "@/app/actions/team-actions"

interface TeamTransfersProps {
  initialTeam: UserTeam
  currentGameweek: number
}

export function TeamTransfers({ initialTeam, currentGameweek }: TeamTransfersProps) {
  const { data: session } = useSession()
  const [userTeam, setUserTeam] = useState<UserTeam>(initialTeam)
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [positionFilter, setPositionFilter] = useState<"All" | Position>("All")
  const [teamFilter, setTeamFilter] = useState<"All" | Team>("All")
  const [selectedPlayerOut, setSelectedPlayerOut] = useState<string | null>(null)
  const [selectedPlayerIn, setSelectedPlayerIn] = useState<Player | null>(null)
  const [pendingTransfers, setPendingTransfers] = useState<{ out: string; in: Player }[]>([])

  // Refresh team data
  useEffect(() => {
    const refreshTeam = async () => {
      if (session?.user?.id) {
        const team = await getUserTeam()
        if (team) {
          setUserTeam(team)
        }
      }
    }

    refreshTeam()
  }, [session])

  const isUsingUnlimitedTransfer = userTeam.history.some(
    (h) => h.gameweek === currentGameweek && h.boostUsed === "unlimitedTransfer",
  )

  const handleAddTransfer = () => {
    if (!selectedPlayerOut || !selectedPlayerIn) {
      toast({
        title: "Incomplete Transfer",
        description: "Please select both a player to transfer out and a player to transfer in",
        variant: "destructive",
      })
      return
    }

    // Check if player is already in pending transfers
    if (pendingTransfers.some((t) => t.out === selectedPlayerOut)) {
      toast({
        title: "Duplicate Transfer",
        description: "This player is already in your pending transfers",
        variant: "destructive",
      })
      return
    }

    // Add to pending transfers
    setPendingTransfers([...pendingTransfers, { out: selectedPlayerOut, in: selectedPlayerIn }])

    // Reset selections
    setSelectedPlayerOut(null)
    setSelectedPlayerIn(null)
  }

  const handleRemoveTransfer = (index: number) => {
    const updatedTransfers = [...pendingTransfers]
    updatedTransfers.splice(index, 1)
    setPendingTransfers(updatedTransfers)
  }

  const handleConfirmTransfers = async () => {
    if (pendingTransfers.length === 0) {
      toast({
        title: "No Transfers",
        description: "You haven't made any transfers yet",
        variant: "destructive",
      })
      return
    }

    if (!isUsingUnlimitedTransfer && pendingTransfers.length > userTeam.transfers) {
      toast({
        title: "Too Many Transfers",
        description: `You only have ${userTeam.transfers} transfers available`,
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      await makeTransfers(
        pendingTransfers.map((t) => t.out),
        pendingTransfers.map((t) => t.in),
        currentGameweek,
      )

      toast({
        title: "Transfers Confirmed",
        description: `Successfully made ${pendingTransfers.length} transfers`,
      })

      // Reset
      setPendingTransfers([])

      // Refresh team data
      const team = await getUserTeam()
      if (team) {
        setUserTeam(team)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to confirm transfers. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Filter available players based on position, team, and search query
  const getAvailablePlayers = () => {
    // Start with all players not in the user's team
    let availablePlayers = allPlayers.filter(
      (player) =>
        !userTeam.players.some((p) => p.id === player.id) && !pendingTransfers.some((t) => t.in.id === player.id),
    )

    // Apply position filter
    if (positionFilter !== "All") {
      availablePlayers = availablePlayers.filter((player) => player.position === positionFilter)
    }

    // Apply team filter
    if (teamFilter !== "All") {
      availablePlayers = availablePlayers.filter((player) => player.team === teamFilter)
    }

    // Apply search filter
    if (searchQuery) {
      availablePlayers = availablePlayers.filter((player) =>
        player.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // If a player is selected to transfer out, prioritize same position
    if (selectedPlayerOut) {
      const playerOut = userTeam.players.find((p) => p.id === selectedPlayerOut)
      if (playerOut) {
        // Sort so that same position players come first
        availablePlayers.sort((a, b) => {
          if (a.position === playerOut.position && b.position !== playerOut.position) return -1
          if (a.position !== playerOut.position && b.position === playerOut.position) return 1
          return 0
        })
      }
    }

    return availablePlayers
  }

  const teamColors: Record<Team, string> = {
    "Computer Science": "bg-blue-100 text-blue-800",
    "Information Technology": "bg-green-100 text-green-800",
    Accounting: "bg-yellow-100 text-yellow-800",
    Cybersecurity: "bg-red-100 text-red-800",
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Transfer Players</CardTitle>
          <CardDescription>
            Make changes to your team. You have {isUsingUnlimitedTransfer ? "unlimited" : userTeam.transfers} transfers
            available.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Squad */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Your Squad</h3>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-2">
                  {userTeam.players
                    .filter((player) => !pendingTransfers.some((t) => t.out === player.id))
                    .sort((a, b) => {
                      // Sort by position: GK, DEF, MID, FWD
                      const positionOrder: Record<Position, number> = {
                        Goalkeeper: 1,
                        Defender: 2,
                        Midfielder: 3,
                        Forward: 4,
                      }
                      return positionOrder[a.position] - positionOrder[b.position]
                    })
                    .map((player) => (
                      <div
                        key={player.id}
                        className={`p-3 rounded-md border flex justify-between items-center cursor-pointer transition-colors ${selectedPlayerOut === player.id ? "bg-pink-50 border-pink-200" : "hover:bg-muted"}`}
                        onClick={() => setSelectedPlayerOut(player.id)}
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
                              <span className="text-xs text-muted-foreground">{player.position}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1 rounded-md bg-pink-100 px-2 py-1 text-xs font-medium text-pink-600">
                            <span>£{player.price}m</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </ScrollArea>
            </div>

            {/* Available Players */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Available Players</h3>

              <div className="flex flex-col space-y-4 mb-4">
                <Input
                  placeholder="Search players..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

                <div className="grid grid-cols-2 gap-2">
                  <Select
                    value={positionFilter}
                    onValueChange={(value) => setPositionFilter(value as "All" | Position)}
                  >
                    <SelectTrigger>
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

                  <Select value={teamFilter} onValueChange={(value) => setTeamFilter(value as "All" | Team)}>
                    <SelectTrigger>
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

              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-2">
                  {getAvailablePlayers().map((player) => (
                    <div
                      key={player.id}
                      className={`p-3 rounded-md border flex justify-between items-center cursor-pointer transition-colors ${selectedPlayerIn?.id === player.id ? "bg-green-50 border-green-200" : "hover:bg-muted"}`}
                      onClick={() => setSelectedPlayerIn(player)}
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
                            <span className="text-xs text-muted-foreground">{player.position}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1 rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-600">
                          <span>£{player.price}m</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>

          {/* Add Transfer Button */}
          <div className="flex justify-center mt-6">
            <Button onClick={handleAddTransfer} disabled={!selectedPlayerOut || !selectedPlayerIn}>
              Add Transfer
            </Button>
          </div>

          {/* Pending Transfers */}
          {pendingTransfers.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Pending Transfers</h3>
              <div className="space-y-4">
                {pendingTransfers.map((transfer, index) => {
                  const playerOut = userTeam.players.find((p) => p.id === transfer.out)
                  const playerIn = transfer.in

                  if (!playerOut) return null

                  return (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-md">
                      <div className="flex items-center space-x-4">
                        <div className="flex flex-col items-center">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className={`${teamColors[playerOut.team].split(" ")[0]}`}>
                              {playerOut.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <p className="text-xs mt-1">{playerOut.name}</p>
                        </div>

                        <div className="flex flex-col items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12h14"></path>
                            <path d="m12 5 7 7-7 7"></path>
                          </svg>
                        </div>

                        <div className="flex flex-col items-center">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className={`${teamColors[playerIn.team].split(" ")[0]}`}>
                              {playerIn.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <p className="text-xs mt-1">{playerIn.name}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-sm">
                          <p>Cost: £{playerIn.price - playerOut.price}m</p>
                        </div>

                        <Button variant="outline" size="sm" onClick={() => handleRemoveTransfer(index)}>
                          Remove
                        </Button>
                      </div>
                    </div>
                  )
                })}

                <div className="flex justify-between items-center p-4 border rounded-md bg-muted">
                  <div>
                    <p className="font-medium">
                      Total Cost: £
                      {pendingTransfers
                        .reduce((total, transfer) => {
                          const playerOut = userTeam.players.find((p) => p.id === transfer.out)
                          return total + (transfer.in.price - (playerOut?.price || 0))
                        }, 0)
                        .toFixed(1)}
                      m
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Transfers: {pendingTransfers.length}/{isUsingUnlimitedTransfer ? "∞" : userTeam.transfers}
                    </p>
                  </div>

                  <Button onClick={handleConfirmTransfers} disabled={isLoading}>
                    {isLoading ? "Processing..." : "Confirm Transfers"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

