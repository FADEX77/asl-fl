import { StandingsTable } from "@/components/standings-table"
import { StandingsHeader } from "@/components/standings-header"

export default function StandingsPage() {
  return (
    <div className="space-y-8">
      <StandingsHeader />
      <StandingsTable />
    </div>
  )
}

