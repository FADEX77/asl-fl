import Link from "next/link"
import Image from "next/image"
import { Trophy, Users, BarChart3, Repeat, Zap } from "lucide-react"

export function DashboardNav() {
  return (
    <div className="flex items-center gap-6">
      <Link href="/dashboard" className="flex items-center gap-2">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ALL%20STARS%20LEAGUE%20LOGO-WcTL3NyRe9uI4AMKTxOWgU6BdRwgvP.png"
          alt="All Stars League Logo"
          width={40}
          height={40}
          className="rounded-md"
        />
        <span className="hidden font-bold sm:inline-block">All Stars League</span>
      </Link>
      <nav className="flex gap-6">
        <Link
          href="/dashboard/team"
          className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary"
        >
          <Users className="h-4 w-4" />
          <span>My Team</span>
        </Link>
        <Link
          href="/dashboard/transfers"
          className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary"
        >
          <Repeat className="h-4 w-4" />
          <span>Transfers</span>
        </Link>
        <Link
          href="/dashboard/standings"
          className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary"
        >
          <Trophy className="h-4 w-4" />
          <span>Standings</span>
        </Link>
        <Link
          href="/dashboard/stats"
          className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary"
        >
          <BarChart3 className="h-4 w-4" />
          <span>Stats</span>
        </Link>
        <Link
          href="/dashboard/boosts"
          className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary"
        >
          <Zap className="h-4 w-4" />
          <span>Boosts</span>
        </Link>
      </nav>
    </div>
  )
}

