"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Users, Trophy, Settings, BarChart3, Home, Calendar, Database } from "lucide-react"

export function AdminSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  return (
    <div className="w-64 bg-slate-800 text-white min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
      </div>

      <nav className="space-y-2">
        <Link
          href="/admin"
          className={`flex items-center gap-2 p-2 rounded-md ${isActive("/admin") && !isActive("/admin/users") && !isActive("/admin/teams") && !isActive("/admin/players") && !isActive("/admin/gameweeks") && !isActive("/admin/settings") ? "bg-slate-700" : "hover:bg-slate-700"}`}
        >
          <Home className="h-5 w-5" />
          <span>Dashboard</span>
        </Link>

        <Link
          href="/admin/users"
          className={`flex items-center gap-2 p-2 rounded-md ${isActive("/admin/users") ? "bg-slate-700" : "hover:bg-slate-700"}`}
        >
          <Users className="h-5 w-5" />
          <span>Users</span>
        </Link>

        <Link
          href="/admin/teams"
          className={`flex items-center gap-2 p-2 rounded-md ${isActive("/admin/teams") ? "bg-slate-700" : "hover:bg-slate-700"}`}
        >
          <Trophy className="h-5 w-5" />
          <span>Teams</span>
        </Link>

        <Link
          href="/admin/players"
          className={`flex items-center gap-2 p-2 rounded-md ${isActive("/admin/players") ? "bg-slate-700" : "hover:bg-slate-700"}`}
        >
          <Users className="h-5 w-5" />
          <span>Players</span>
        </Link>

        <Link
          href="/admin/gameweeks"
          className={`flex items-center gap-2 p-2 rounded-md ${isActive("/admin/gameweeks") ? "bg-slate-700" : "hover:bg-slate-700"}`}
        >
          <Calendar className="h-5 w-5" />
          <span>Gameweeks</span>
        </Link>

        <Link
          href="/admin/stats"
          className={`flex items-center gap-2 p-2 rounded-md ${isActive("/admin/stats") ? "bg-slate-700" : "hover:bg-slate-700"}`}
        >
          <BarChart3 className="h-5 w-5" />
          <span>Statistics</span>
        </Link>

        <Link
          href="/admin/database"
          className={`flex items-center gap-2 p-2 rounded-md ${isActive("/admin/database") ? "bg-slate-700" : "hover:bg-slate-700"}`}
        >
          <Database className="h-5 w-5" />
          <span>Database</span>
        </Link>

        <Link
          href="/admin/settings"
          className={`flex items-center gap-2 p-2 rounded-md ${isActive("/admin/settings") ? "bg-slate-700" : "hover:bg-slate-700"}`}
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Link>
      </nav>
    </div>
  )
}

