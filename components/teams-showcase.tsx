import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function TeamsShowcase() {
  const teams = [
    {
      name: "Computer Science",
      shortName: "CS",
      logo: "/images/teams/cmp.png",
      description: "Established in 2022, the Computer Science team brings technical precision to the field.",
    },
    {
      name: "Information Technology",
      shortName: "IT",
      logo: "/images/teams/ift.png",
      description: "Tech Net 2024 - The IT team combines networking skills with football prowess.",
    },
    {
      name: "Accounting",
      shortName: "ACC",
      logo: "/images/teams/acc.png",
      description: "Accounting 300 - Balancing the books and dominating the pitch since their founding.",
    },
    {
      name: "Cybersecurity",
      shortName: "CYB",
      logo: "/images/teams/cyb.png",
      description: "CyberTech - 'We Code' is their motto, bringing defensive excellence to the game.",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Meet The Teams</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              The All Stars League features four competitive teams from different departments.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
          {teams.map((team) => (
            <Card key={team.shortName} className="overflow-hidden">
              <div className="aspect-square relative">
                <Image src={team.logo || "/placeholder.svg"} alt={team.name} fill className="object-contain p-4" />
              </div>
              <CardHeader className="pb-2">
                <CardTitle>{team.name}</CardTitle>
                <CardDescription>{team.shortName}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{team.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

