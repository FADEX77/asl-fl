import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function TeamOverview() {
  const players = [
    { name: "John Smith", team: "Computer Science", position: "Forward", points: 8 },
    { name: "Sarah Johnson", team: "Information Technology", position: "Midfielder", points: 6 },
    { name: "Michael Brown", team: "Accounting", position: "Defender", points: 5 },
    { name: "Emily Davis", team: "Cybersecurity", position: "Goalkeeper", points: 10 },
  ]

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Team Overview</CardTitle>
        <CardDescription>Your top performing players this week</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {players.map((player, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={player.name} />
                  <AvatarFallback>
                    {player.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{player.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {player.team} - {player.position}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-1 rounded-md bg-pink-100 px-2 py-1 text-xs font-medium text-pink-600">
                <span>{player.points}</span>
                <span>pts</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

