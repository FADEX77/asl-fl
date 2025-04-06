import type { Player } from "./players-data"

export interface UserTeam {
  userId: string
  teamName: string
  players: Player[]
  starters: string[] // Array of player IDs who are starters
  captain: string // Player ID of the captain
  viceCaptain: string // Player ID of the vice captain
  budget: number
  totalPoints: number
  transfers: number
  gameweekPoints: number
  history: GameweekHistory[]
  boosts: BoostsAvailable
}

export interface BoostsAvailable {
  benchBoost: boolean
  tripleCaptain: boolean
  unlimitedTransfer: boolean
  managerBoost: boolean
}

export interface GameweekHistory {
  gameweek: number
  points: number
  starters: string[]
  captain: string
  viceCaptain: string
  boostUsed: keyof BoostsAvailable | null
  transfers: TransferRecord[]
}

export interface TransferRecord {
  playerOut: string
  playerIn: string
  gameweek: number
  timestamp: number
}

export interface PlayerPerformance {
  playerId: string
  gameweek: number
  goals: number
  assists: number
  yellowCards: number
  redCards: number
  cleanSheet: boolean
  started: boolean
  subbedIn: boolean
  finishedMatch: boolean
  manOfTheMatch: boolean
  points: number
}

// Default initial team state
export const createInitialTeam = (userId: string): UserTeam => {
  return {
    userId,
    teamName: "My Team",
    players: [],
    starters: [],
    captain: "",
    viceCaptain: "",
    budget: 100.0,
    totalPoints: 0,
    gameweekPoints: 0,
    transfers: 2,
    history: [],
    boosts: {
      benchBoost: true,
      tripleCaptain: true,
      unlimitedTransfer: true,
      managerBoost: true,
    },
  }
}

export const calculatePlayerPoints = (
  performance: PlayerPerformance,
  isCaptain: boolean,
  isViceCaptain: boolean,
  isTripleCaptain: boolean,
): number => {
  let points = 0

  // Basic points
  if (performance.started) points += 2
  if (performance.subbedIn) points += 1
  if (performance.finishedMatch) points += 1

  // Performance points
  points += performance.goals * 6
  points += performance.assists * 3
  points -= performance.yellowCards * 1
  points -= performance.redCards * 2

  // Clean sheet points depend on position (handled elsewhere)
  if (performance.cleanSheet) points += 6 // This will be adjusted based on position

  // Man of the match
  if (performance.manOfTheMatch) points += 4

  // Captain and vice-captain multipliers
  if (isCaptain) {
    if (isTripleCaptain) {
      points *= 3
    } else {
      points *= 2
    }
  } else if (isViceCaptain) {
    points += 2
  }

  return points
}

