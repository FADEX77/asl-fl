import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function StatsOverview() {
  const stats = [
    {
      title: "Top Scorer",
      name: "Jacob Young",
      team: "Computer Science",
      value: "12 goals",
    },
    {
      title: "Most Assists",
      name: "William Anderson",
      team: "Computer Science",
      value: "8 assists",
    },
    {
      title: "Best Goalkeeper",
      name: "Emma Garcia",
      team: "Cybersecurity",
      value: "5 clean sheets",
    },
    {
      title: "Most Points",
      name: "Jacob Young",
      team: "Computer Science",
      value: "75 points",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.name}</div>
            <p className="text-xs text-muted-foreground">{stat.team}</p>
            <div className="mt-2 flex items-center space-x-1 rounded-md bg-pink-100 px-2 py-1 text-xs font-medium text-pink-600 w-fit">
              <span>{stat.value}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

