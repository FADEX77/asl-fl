"use server"

import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import type { UserTeam, TransferRecord } from "@/lib/fantasy-types"
import type { Player } from "@/lib/players-data"

// This is a mock database for demonstration purposes
// In a real app, you would use a database like MongoDB, PostgreSQL, etc.
const userTeams: Record<string, UserTeam> = {}

export async function saveUserTeam(team: UserTeam) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    throw new Error("You must be logged in to save a team")
  }

  // Ensure the team belongs to the current user
  if (team.userId !== session.user.id) {
    throw new Error("You can only save your own team")
  }

  // Save the team
  userTeams[session.user.id] = team

  // Revalidate the team page to show the updated team
  revalidatePath("/dashboard/team")

  return { success: true }
}

export async function getUserTeam() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return null
  }

  return userTeams[session.user.id] || null
}

export async function makeTransfers(playerOut: string[], playerIn: Player[], gameweek: number) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    throw new Error("You must be logged in to make transfers")
  }

  const userTeam = userTeams[session.user.id]

  if (!userTeam) {
    throw new Error("Team not found")
  }

  // Check if user has enough transfers
  if (playerOut.length > userTeam.transfers && !isUsingUnlimitedTransfer(userTeam, gameweek)) {
    throw new Error(`You only have ${userTeam.transfers} transfers available`)
  }

  // Process transfers
  const transfers: TransferRecord[] = []
  let updatedPlayers = [...userTeam.players]
  let updatedBudget = userTeam.budget

  for (let i = 0; i < playerOut.length; i++) {
    const outId = playerOut[i]
    const inPlayer = playerIn[i]

    // Find the player being transferred out
    const outPlayer = updatedPlayers.find((p) => p.id === outId)

    if (!outPlayer) {
      throw new Error(`Player with ID ${outId} not found in your team`)
    }

    // Update budget
    updatedBudget += outPlayer.price - inPlayer.price

    if (updatedBudget < 0) {
      throw new Error("Insufficient budget for transfers")
    }

    // Update players list
    updatedPlayers = updatedPlayers.filter((p) => p.id !== outId)
    updatedPlayers.push(inPlayer)

    // Record transfer
    transfers.push({
      playerOut: outId,
      playerIn: inPlayer.id,
      gameweek,
      timestamp: Date.now(),
    })
  }

  // Update starters and captain if necessary
  let updatedStarters = [...userTeam.starters]
  let updatedCaptain = userTeam.captain
  let updatedViceCaptain = userTeam.viceCaptain

  // Remove transferred out players from starters
  updatedStarters = updatedStarters.filter((id) => !playerOut.includes(id))

  // Update captain if transferred out
  if (playerOut.includes(updatedCaptain)) {
    updatedCaptain = ""
  }

  // Update vice captain if transferred out
  if (playerOut.includes(updatedViceCaptain)) {
    updatedViceCaptain = ""
  }

  // Update transfers count if not using unlimited transfer
  const updatedTransfers = isUsingUnlimitedTransfer(userTeam, gameweek)
    ? userTeam.transfers
    : userTeam.transfers - playerOut.length

  // Update team
  userTeams[session.user.id] = {
    ...userTeam,
    players: updatedPlayers,
    starters: updatedStarters,
    captain: updatedCaptain,
    viceCaptain: updatedViceCaptain,
    budget: updatedBudget,
    transfers: updatedTransfers,
    history: [
      ...userTeam.history,
      ...transfers.map((t) => ({
        gameweek,
        transfers: [t],
        points: 0,
        starters: [],
        captain: "",
        viceCaptain: "",
        boostUsed: null,
      })),
    ],
  }

  revalidatePath("/dashboard/team")
  revalidatePath("/dashboard/transfers")

  return { success: true }
}

export async function useBoost(boostType: keyof UserTeam["boosts"], gameweek: number) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    throw new Error("You must be logged in to use a boost")
  }

  const userTeam = userTeams[session.user.id]

  if (!userTeam) {
    throw new Error("Team not found")
  }

  // Check if boost is available
  if (!userTeam.boosts[boostType]) {
    throw new Error(`${boostType} has already been used`)
  }

  // Update boosts
  userTeams[session.user.id] = {
    ...userTeam,
    boosts: {
      ...userTeam.boosts,
      [boostType]: false,
    },
    history: [
      ...userTeam.history,
      {
        gameweek,
        points: 0,
        starters: userTeam.starters,
        captain: userTeam.captain,
        viceCaptain: userTeam.viceCaptain,
        boostUsed: boostType,
        transfers: [],
      },
    ],
  }

  revalidatePath("/dashboard/team")

  return { success: true }
}

// Helper function to check if user is using unlimited transfer
function isUsingUnlimitedTransfer(team: UserTeam, gameweek: number): boolean {
  return team.history.some((h) => h.gameweek === gameweek && h.boostUsed === "unlimitedTransfer")
}

