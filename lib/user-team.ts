import type { Player } from "./players-data"

export interface UserTeam {
  userId: string
  teamName: string
  players: Player[]
  starters: string[] // Array of player IDs who are starters
  captain: string // Player ID of the captain
  budget: number
  totalPoints: number
}

// Default initial team state
export const createInitialTeam = (userId: string): UserTeam => {
  return {
    userId,
    teamName: "My Team",
    players: [],
    starters: [],
    captain: "",
    budget: 100.0,
    totalPoints: 0,
  }
}

