"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import type { UserTeam } from "@/lib/fantasy-types"
import { useBoost } from "@/app/actions/team-actions"
import { useCallback } from "react"

interface TeamBoostsProps {
  team: UserTeam
  currentGameweek: number
  onBoostUsed: () => void
}

export function TeamBoosts({ team, currentGameweek, onBoostUsed }: TeamBoostsProps) {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)

  const boostAction = useBoost()

  const handleUseBoost = useCallback(
    async (boostType: keyof UserTeam["boosts"]) => {
      if (!session?.user?.id) {
        toast({
          title: "Not Logged In",
          description: "You must be logged in to use a boost",
          variant: "destructive",
        })
        return
      }

      setIsLoading(true)

      try {
        await boostAction(boostType, currentGameweek)
        toast({
          title: "Boost Activated",
          description: `${boostType} has been activated for this gameweek`,
        })
        onBoostUsed()
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to activate boost. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    },
    [session?.user?.id, boostAction, currentGameweek, onBoostUsed],
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Boosts</CardTitle>
        <CardDescription>Use your boosts strategically to maximize your points</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className={`border ${team.boosts.benchBoost ? "border-green-500" : "border-gray-300"}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Bench Boost</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Points from your bench players are added to your gameweek total
              </p>
              <Button
                onClick={() => handleUseBoost("benchBoost")}
                disabled={!team.boosts.benchBoost || isLoading}
                variant={team.boosts.benchBoost ? "default" : "outline"}
                className="w-full"
              >
                {team.boosts.benchBoost ? "Activate" : "Already Used"}
              </Button>
            </CardContent>
          </Card>

          <Card className={`border ${team.boosts.tripleCaptain ? "border-green-500" : "border-gray-300"}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Triple Captain</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Your captain gets 3x points instead of 2x</p>
              <Button
                onClick={() => handleUseBoost("tripleCaptain")}
                disabled={!team.boosts.tripleCaptain || isLoading}
                variant={team.boosts.tripleCaptain ? "default" : "outline"}
                className="w-full"
              >
                {team.boosts.tripleCaptain ? "Activate" : "Already Used"}
              </Button>
            </CardContent>
          </Card>

          <Card className={`border ${team.boosts.unlimitedTransfer ? "border-green-500" : "border-gray-300"}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Unlimited Transfer</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Make unlimited transfers for this gameweek</p>
              <Button
                onClick={() => handleUseBoost("unlimitedTransfer")}
                disabled={!team.boosts.unlimitedTransfer || isLoading}
                variant={team.boosts.unlimitedTransfer ? "default" : "outline"}
                className="w-full"
              >
                {team.boosts.unlimitedTransfer ? "Activate" : "Already Used"}
              </Button>
            </CardContent>
          </Card>

          <Card className={`border ${team.boosts.managerBoost ? "border-green-500" : "border-gray-300"}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Manager Boost</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Each player from winning teams gets +4 points</p>
              <Button
                onClick={() => handleUseBoost("managerBoost")}
                disabled={!team.boosts.managerBoost || isLoading}
                variant={team.boosts.managerBoost ? "default" : "outline"}
                className="w-full"
              >
                {team.boosts.managerBoost ? "Activate" : "Already Used"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}

