export type Position = "Goalkeeper" | "Defender" | "Midfielder" | "Forward"
export type Team = "Computer Science" | "Information Technology" | "Accounting" | "Cybersecurity"

export interface Player {
  id: string
  name: string
  position: Position
  team: Team
  price: number
  points: number
}

export const allPlayers: Player[] = [
  // CYBERSECURITY
  // Goalkeepers
  { id: "cs-gk-1", name: "Onana", position: "Goalkeeper", team: "Cybersecurity", price: 5.0, points: 25 },
  { id: "cs-gk-2", name: "Dogo", position: "Goalkeeper", team: "Cybersecurity", price: 4.5, points: 20 },

  // Defenders
  { id: "cs-def-1", name: "Panky", position: "Defender", team: "Cybersecurity", price: 5.5, points: 30 },
  { id: "cs-def-2", name: "Lamba", position: "Defender", team: "Cybersecurity", price: 5.0, points: 28 },
  { id: "cs-def-3", name: "Oyin", position: "Defender", team: "Cybersecurity", price: 4.8, points: 26 },
  { id: "cs-def-4", name: "Hunter", position: "Defender", team: "Cybersecurity", price: 4.5, points: 24 },
  { id: "cs-def-5", name: "Bolu", position: "Defender", team: "Cybersecurity", price: 4.3, points: 22 },
  { id: "cs-def-6", name: "Kitan", position: "Defender", team: "Cybersecurity", price: 4.0, points: 20 },

  // Midfielders
  { id: "cs-mid-1", name: "Shabi", position: "Midfielder", team: "Cybersecurity", price: 7.5, points: 45 },
  { id: "cs-mid-2", name: "Caleb", position: "Midfielder", team: "Cybersecurity", price: 7.2, points: 42 },
  { id: "cs-mid-3", name: "Isaac", position: "Midfielder", team: "Cybersecurity", price: 7.0, points: 40 },
  { id: "cs-mid-4", name: "Layi", position: "Midfielder", team: "Cybersecurity", price: 6.8, points: 38 },
  { id: "cs-mid-5", name: "Commando", position: "Midfielder", team: "Cybersecurity", price: 6.5, points: 36 },
  { id: "cs-mid-6", name: "Adeife", position: "Midfielder", team: "Cybersecurity", price: 6.3, points: 34 },
  { id: "cs-mid-7", name: "Neymar", position: "Midfielder", team: "Cybersecurity", price: 6.0, points: 32 },
  { id: "cs-mid-8", name: "Bobo", position: "Midfielder", team: "Cybersecurity", price: 5.8, points: 30 },
  { id: "cs-mid-9", name: "Sonic", position: "Midfielder", team: "Cybersecurity", price: 5.5, points: 28 },
  { id: "cs-mid-10", name: "John", position: "Midfielder", team: "Cybersecurity", price: 5.3, points: 26 },

  // Forwards
  { id: "cs-fwd-1", name: "Boniface", position: "Forward", team: "Cybersecurity", price: 8.5, points: 50 },
  { id: "cs-fwd-2", name: "Dunmomi", position: "Forward", team: "Cybersecurity", price: 8.0, points: 45 },

  // ACCOUNTING
  // Goalkeepers
  { id: "acc-gk-1", name: "Mark", position: "Goalkeeper", team: "Accounting", price: 5.0, points: 25 },
  { id: "acc-gk-2", name: "Nifemi", position: "Goalkeeper", team: "Accounting", price: 4.5, points: 20 },

  // Defenders
  { id: "acc-def-1", name: "Chizi", position: "Defender", team: "Accounting", price: 5.5, points: 30 },
  { id: "acc-def-2", name: "Saviour", position: "Defender", team: "Accounting", price: 5.0, points: 28 },
  { id: "acc-def-3", name: "Jiga", position: "Defender", team: "Accounting", price: 4.8, points: 26 },
  { id: "acc-def-4", name: "Drizzy", position: "Defender", team: "Accounting", price: 4.5, points: 24 },
  { id: "acc-def-5", name: "Caleb", position: "Defender", team: "Accounting", price: 4.3, points: 22 },
  { id: "acc-def-6", name: "Ebuka", position: "Defender", team: "Accounting", price: 4.0, points: 20 },
  { id: "acc-def-7", name: "Ope", position: "Defender", team: "Accounting", price: 3.8, points: 18 },

  // Midfielders
  { id: "acc-mid-1", name: "Wisdom", position: "Midfielder", team: "Accounting", price: 7.5, points: 45 },
  { id: "acc-mid-2", name: "Bryan", position: "Midfielder", team: "Accounting", price: 7.2, points: 42 },
  { id: "acc-mid-3", name: "Batam", position: "Midfielder", team: "Accounting", price: 7.0, points: 40 },
  { id: "acc-mid-4", name: "Dami", position: "Midfielder", team: "Accounting", price: 6.8, points: 38 },
  { id: "acc-mid-5", name: "Darasimi", position: "Midfielder", team: "Accounting", price: 6.5, points: 36 },

  // Forwards
  { id: "acc-fwd-1", name: "Maru", position: "Forward", team: "Accounting", price: 8.5, points: 50 },
  { id: "acc-fwd-2", name: "Korex", position: "Forward", team: "Accounting", price: 8.0, points: 45 },
  { id: "acc-fwd-3", name: "Demilade", position: "Forward", team: "Accounting", price: 7.5, points: 40 },
  { id: "acc-fwd-4", name: "Emma", position: "Forward", team: "Accounting", price: 7.0, points: 35 },
  { id: "acc-fwd-5", name: "Otto", position: "Forward", team: "Accounting", price: 6.5, points: 30 },

  // INFORMATION TECHNOLOGY
  // Goalkeepers
  { id: "it-gk-1", name: "Nate", position: "Goalkeeper", team: "Information Technology", price: 5.0, points: 25 },

  // Defenders
  { id: "it-def-1", name: "Akosh", position: "Defender", team: "Information Technology", price: 5.5, points: 30 },
  { id: "it-def-2", name: "Zuma", position: "Defender", team: "Information Technology", price: 5.0, points: 28 },
  { id: "it-def-3", name: "Samuel", position: "Defender", team: "Information Technology", price: 4.8, points: 26 },
  { id: "it-def-4", name: "Theo", position: "Defender", team: "Information Technology", price: 4.5, points: 24 },
  { id: "it-def-5", name: "Bright", position: "Defender", team: "Information Technology", price: 4.3, points: 22 },
  { id: "it-def-6", name: "Batman", position: "Defender", team: "Information Technology", price: 4.0, points: 20 },
  { id: "it-def-7", name: "Jerrry", position: "Defender", team: "Information Technology", price: 3.8, points: 18 },

  // Midfielders
  { id: "it-mid-1", name: "Toes", position: "Midfielder", team: "Information Technology", price: 7.5, points: 45 },
  { id: "it-mid-2", name: "Ebuka", position: "Midfielder", team: "Information Technology", price: 7.2, points: 42 },
  { id: "it-mid-3", name: "OEO", position: "Midfielder", team: "Information Technology", price: 7.0, points: 40 },
  { id: "it-mid-4", name: "Fadex", position: "Midfielder", team: "Information Technology", price: 6.8, points: 38 },
  { id: "it-mid-5", name: "Ope", position: "Midfielder", team: "Information Technology", price: 6.5, points: 36 },
  { id: "it-mid-6", name: "Grant", position: "Midfielder", team: "Information Technology", price: 6.3, points: 34 },
  { id: "it-mid-7", name: "Enoch", position: "Midfielder", team: "Information Technology", price: 6.0, points: 32 },

  // Forwards
  { id: "it-fwd-1", name: "Spidey", position: "Forward", team: "Information Technology", price: 8.5, points: 50 },
  { id: "it-fwd-2", name: "Bishop", position: "Forward", team: "Information Technology", price: 8.0, points: 45 },
  { id: "it-fwd-3", name: "Popo", position: "Forward", team: "Information Technology", price: 7.5, points: 40 },
  { id: "it-fwd-4", name: "Zico", position: "Forward", team: "Information Technology", price: 7.0, points: 35 },

  // COMPUTER SCIENCE
  // Goalkeepers
  { id: "comp-gk-1", name: "Temi", position: "Goalkeeper", team: "Computer Science", price: 5.0, points: 25 },

  // Defenders
  { id: "comp-def-1", name: "Aquila", position: "Defender", team: "Computer Science", price: 5.5, points: 30 },
  { id: "comp-def-2", name: "Timo", position: "Defender", team: "Computer Science", price: 5.0, points: 28 },
  { id: "comp-def-3", name: "Feranmi", position: "Defender", team: "Computer Science", price: 4.8, points: 26 },
  { id: "comp-def-4", name: "Anjorin", position: "Defender", team: "Computer Science", price: 4.5, points: 24 },
  { id: "comp-def-5", name: "Smalla", position: "Defender", team: "Computer Science", price: 4.3, points: 22 },
  { id: "comp-def-6", name: "Moko", position: "Defender", team: "Computer Science", price: 4.0, points: 20 },

  // Midfielders
  { id: "comp-mid-1", name: "Semi", position: "Midfielder", team: "Computer Science", price: 7.5, points: 45 },
  { id: "comp-mid-2", name: "Foden", position: "Midfielder", team: "Computer Science", price: 7.2, points: 42 },
  { id: "comp-mid-3", name: "Pauloranking", position: "Midfielder", team: "Computer Science", price: 7.0, points: 40 },
  { id: "comp-mid-4", name: "Izzie", position: "Midfielder", team: "Computer Science", price: 6.8, points: 38 },
  { id: "comp-mid-5", name: "Mara", position: "Midfielder", team: "Computer Science", price: 6.5, points: 36 },
  { id: "comp-mid-6", name: "Lanky", position: "Midfielder", team: "Computer Science", price: 6.3, points: 34 },
  { id: "comp-mid-7", name: "Emma", position: "Midfielder", team: "Computer Science", price: 6.0, points: 32 },
  { id: "comp-mid-8", name: "Tomzy", position: "Midfielder", team: "Computer Science", price: 5.8, points: 30 },

  // Forwards
  { id: "comp-fwd-1", name: "Shikan", position: "Forward", team: "Computer Science", price: 8.5, points: 50 },
  { id: "comp-fwd-2", name: "Isaiah", position: "Forward", team: "Computer Science", price: 8.0, points: 45 },
]

export const getPlayersByPosition = (position: Position) => {
  return allPlayers.filter((player) => player.position === position)
}

export const getPlayersByTeam = (team: Team) => {
  return allPlayers.filter((player) => player.team === team)
}

export const getPlayerById = (id: string) => {
  return allPlayers.find((player) => player.id === id)
}

