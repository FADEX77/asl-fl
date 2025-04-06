import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export function HomeStats() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">League Statistics</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Check out the current standings and statistics for the All Stars League.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full overflow-hidden">
                  <Image
                    src="/images/teams/cmp.png"
                    alt="Computer Science"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <CardTitle className="text-pink-600">Computer Science</CardTitle>
              </div>
              <CardDescription>Department Team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85 pts</div>
              <p className="text-xs text-muted-foreground">Current Position: 1st</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full overflow-hidden">
                  <Image
                    src="/images/teams/ift.png"
                    alt="Information Technology"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <CardTitle className="text-pink-600">Information Technology</CardTitle>
              </div>
              <CardDescription>Department Team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">72 pts</div>
              <p className="text-xs text-muted-foreground">Current Position: 2nd</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full overflow-hidden">
                  <Image
                    src="/images/teams/acc.png"
                    alt="Accounting"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <CardTitle className="text-pink-600">Accounting</CardTitle>
              </div>
              <CardDescription>Department Team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68 pts</div>
              <p className="text-xs text-muted-foreground">Current Position: 3rd</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full overflow-hidden">
                  <Image
                    src="/images/teams/cyb.png"
                    alt="Cybersecurity"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <CardTitle className="text-pink-600">Cybersecurity</CardTitle>
              </div>
              <CardDescription>Department Team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">65 pts</div>
              <p className="text-xs text-muted-foreground">Current Position: 4th</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

