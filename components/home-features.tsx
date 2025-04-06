import { Trophy, Users, BarChart3, Zap } from "lucide-react"

export function HomeFeatures() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-pink-100 px-3 py-1 text-sm text-pink-600">Features</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Everything You Need for Fantasy Success</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform provides all the tools and features you need to build and manage your fantasy team.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          <div className="grid gap-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-pink-100 text-pink-600">
                <Users className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Team Management</h3>
                <p className="text-muted-foreground">
                  Build your dream team from the four departments: Computer Science, Information Technology, Accounting,
                  and Cybersecurity.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-pink-100 text-pink-600">
                <Trophy className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">League Standings</h3>
                <p className="text-muted-foreground">
                  Track your position in the league and see how your team compares to others in real-time.
                </p>
              </div>
            </div>
          </div>
          <div className="grid gap-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-pink-100 text-pink-600">
                <BarChart3 className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Player Statistics</h3>
                <p className="text-muted-foreground">
                  Access detailed statistics for all players to make informed decisions for your team.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-pink-100 text-pink-600">
                <Zap className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Live Updates</h3>
                <p className="text-muted-foreground">
                  Get real-time updates on player performances and points during matches.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

