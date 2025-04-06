export type TeamShortName = "CS" | "IT" | "ACC" | "CYB"

export const teamLogoMap: Record<TeamShortName, string> = {
  CS: "/images/teams/cmp.png",
  IT: "/images/teams/ift.png",
  ACC: "/images/teams/acc.png",
  CYB: "/images/teams/cyb.png",
}

export const teamFullNameMap: Record<TeamShortName, string> = {
  CS: "Computer Science",
  IT: "Information Technology",
  ACC: "Accounting",
  CYB: "Cybersecurity",
}

export const getTeamLogo = (shortName: TeamShortName): string => {
  return teamLogoMap[shortName] || "/placeholder.svg?height=100&width=100"
}

export const getTeamColorClass = (shortName: TeamShortName): string => {
  switch (shortName) {
    case "CS":
      return "bg-green-100 text-green-800"
    case "IT":
      return "bg-yellow-100 text-yellow-800"
    case "ACC":
      return "bg-amber-100 text-amber-800"
    case "CYB":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

