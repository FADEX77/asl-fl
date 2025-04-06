import { StatsHeader } from "@/components/stats-header"
import { StatsOverview } from "@/components/stats-overview"
import { PlayerStats } from "@/components/player-stats"

export default function StatsPage() {
  return (
    <div className="space-y-8">
      <StatsHeader />
      <StatsOverview />
      <PlayerStats />
    </div>
  )
}

