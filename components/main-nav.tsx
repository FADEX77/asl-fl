import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function MainNav() {
  return (
    <div className="container flex h-16 items-center justify-between py-4">
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ALL%20STARS%20LEAGUE%20LOGO-WcTL3NyRe9uI4AMKTxOWgU6BdRwgvP.png"
            alt="All Stars League Logo"
            width={40}
            height={40}
            className="rounded-md"
          />
          <span className="hidden font-bold sm:inline-block">All Stars League</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="/rules" className="text-sm font-medium transition-colors hover:text-primary">
            Rules
          </Link>
          <Link href="/teams" className="text-sm font-medium transition-colors hover:text-primary">
            Teams
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-2">
        <Link href="/login">
          <Button variant="outline" size="sm">
            Log In
          </Button>
        </Link>
        <Link href="/register">
          <Button size="sm">Sign Up</Button>
        </Link>
      </div>
    </div>
  )
}

