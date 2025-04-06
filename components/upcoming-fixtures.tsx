import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function UpcomingFixtures() {
  const fixtures = [
    {
      home: "Computer Science",
      away: "Information Technology",
      date: "Sat, 15 Apr",
      time: "15:00",
    },
    {
      home: "Accounting",
      away: "Cybersecurity",
      date: "Sun, 16 Apr",
      time: "14:30",
    },
    {
      home: "Computer Science",
      away: "Accounting",
      date: "Sat, 22 Apr",
      time: "15:00",
    },
    {
      home: "Information Technology",
      away: "Cybersecurity",
      date: "Sun, 23 Apr",
      time: "14:30",
    },
  ]

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Upcoming Fixtures</CardTitle>
        <CardDescription>Next matches in the All Stars League</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {fixtures.map((fixture, index) => (
            <div key={index} className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{fixture.home}</span>
                    <span className="text-muted-foreground">vs</span>
                    <span className="font-medium">{fixture.away}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1 rounded-md bg-muted px-2 py-1 text-xs">
                  <span>{fixture.date}</span>
                  <span>•</span>
                  <span>{fixture.time}</span>
                </div>
              </div>
              {index < fixtures.length - 1 && <div className="h-px bg-muted" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

