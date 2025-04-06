"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, Trophy, Users, BarChart3, Home, Book, Repeat, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <div className="flex items-center gap-2 border-b pb-4">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ALL%20STARS%20LEAGUE%20LOGO-WcTL3NyRe9uI4AMKTxOWgU6BdRwgvP.png"
            alt="All Stars League Logo"
            width={40}
            height={40}
            className="rounded-md"
          />
          <span className="font-bold">All Stars League</span>
        </div>
        <nav className="flex flex-col gap-4 mt-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            <Home className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/dashboard/team"
            className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            <Users className="h-4 w-4" />
            <span>My Team</span>
          </Link>
          <Link
            href="/dashboard/transfers"
            className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            <Repeat className="h-4 w-4" />
            <span>Transfers</span>
          </Link>
          <Link
            href="/dashboard/standings"
            className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            <Trophy className="h-4 w-4" />
            <span>Standings</span>
          </Link>
          <Link
            href="/dashboard/stats"
            className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            <BarChart3 className="h-4 w-4" />
            <span>Stats</span>
          </Link>
          <Link
            href="/dashboard/boosts"
            className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            <Zap className="h-4 w-4" />
            <span>Boosts</span>
          </Link>
          <Link
            href="/rules"
            className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setOpen(false)}
          >
            <Book className="h-4 w-4" />
            <span>Rules</span>
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

