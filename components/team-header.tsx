export function TeamHeader() {
  return (
    <div className="flex flex-col space-y-2">
      <h1 className="text-3xl font-bold tracking-tight">My Team</h1>
      <p className="text-muted-foreground">
        Select your fantasy team for the All Stars League. Choose 15 players (11 starters + 4 substitutes) with a
        maximum of 4 players from any single team.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm font-medium">Goalkeepers</p>
          <p className="text-2xl font-bold">2</p>
        </div>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm font-medium">Defenders</p>
          <p className="text-2xl font-bold">5</p>
        </div>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm font-medium">Midfielders</p>
          <p className="text-2xl font-bold">5</p>
        </div>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm font-medium">Forwards</p>
          <p className="text-2xl font-bold">3</p>
        </div>
      </div>
    </div>
  )
}

