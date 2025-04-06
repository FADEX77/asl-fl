import { PrismaClient } from "@prisma/client"
import { hash } from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminPassword = await hash("admin123", 10)
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@example.com",
      passwordHash: adminPassword,
      role: "ADMIN",
    },
  })

  console.log("Admin user created:", admin)

  // Create teams
  const teams = [
    { name: "Computer Science", shortName: "CS", logoUrl: "/images/teams/cmp.png" },
    { name: "Information Technology", shortName: "IT", logoUrl: "/images/teams/ift.png" },
    { name: "Accounting", shortName: "ACC", logoUrl: "/images/teams/acc.png" },
    { name: "Cybersecurity", shortName: "CYB", logoUrl: "/images/teams/cyb.png" },
  ]

  for (const team of teams) {
    await prisma.team.upsert({
      where: { name: team.name },
      update: {},
      create: team,
    })
  }

  console.log("Teams created")

  // Get team IDs
  const csTeam = await prisma.team.findUnique({ where: { name: "Computer Science" } })
  const itTeam = await prisma.team.findUnique({ where: { name: "Information Technology" } })
  const accTeam = await prisma.team.findUnique({ where: { name: "Accounting" } })
  const cybTeam = await prisma.team.findUnique({ where: { name: "Cybersecurity" } })

  if (!csTeam || !itTeam || !accTeam || !cybTeam) {
    throw new Error("Teams not found")
  }

  // Create players
  const players = [
    // Computer Science
    { name: "Temi", position: "Goalkeeper", teamId: csTeam.id, price: 5.0, points: 25 },
    { name: "Aquila", position: "Defender", teamId: csTeam.id, price: 5.5, points: 30 },
    { name: "Timo", position: "Defender", teamId: csTeam.id, price: 5.0, points: 28 },
    { name: "Feranmi", position: "Defender", teamId: csTeam.id, price: 4.8, points: 26 },
    { name: "Anjorin", position: "Defender", teamId: csTeam.id, price: 4.5, points: 24 },
    { name: "Smalla", position: "Defender", teamId: csTeam.id, price: 4.3, points: 22 },
    { name: "Moko", position: "Defender", teamId: csTeam.id, price: 4.0, points: 20 },
    { name: "Semi", position: "Midfielder", teamId: csTeam.id, price: 7.5, points: 45 },
    { name: "Foden", position: "Midfielder", teamId: csTeam.id, price: 7.2, points: 42 },
    { name: "Pauloranking", position: "Midfielder", teamId: csTeam.id, price: 7.0, points: 40 },
    { name: "Izzie", position: "Midfielder", teamId: csTeam.id, price: 6.8, points: 38 },
    { name: "Mara", position: "Midfielder", teamId: csTeam.id, price: 6.5, points: 36 },
    { name: "Lanky", position: "Midfielder", teamId: csTeam.id, price: 6.3, points: 34 },
    { name: "Emma", position: "Midfielder", teamId: csTeam.id, price: 6.0, points: 32 },
    { name: "Tomzy", position: "Midfielder", teamId: csTeam.id, price: 5.8, points: 30 },
    { name: "Shikan", position: "Forward", teamId: csTeam.id, price: 8.5, points: 50 },
    { name: "Isaiah", position: "Forward", teamId: csTeam.id, price: 8.0, points: 45 },

    // Information Technology
    { name: "Nate", position: "Goalkeeper", teamId: itTeam.id, price: 5.0, points: 25 },
    { name: "Akosh", position: "Defender", teamId: itTeam.id, price: 5.5, points: 30 },
    { name: "Zuma", position: "Defender", teamId: itTeam.id, price: 5.0, points: 28 },
    { name: "Samuel", position: "Defender", teamId: itTeam.id, price: 4.8, points: 26 },
    { name: "Theo", position: "Defender", teamId: itTeam.id, price: 4.5, points: 24 },
    { name: "Bright", position: "Defender", teamId: itTeam.id, price: 4.3, points: 22 },
    { name: "Batman", position: "Defender", teamId: itTeam.id, price: 4.0, points: 20 },
    { name: "Jerrry", position: "Defender", teamId: itTeam.id, price: 3.8, points: 18 },
    { name: "Toes", position: "Midfielder", teamId: itTeam.id, price: 7.5, points: 45 },
    { name: "Ebuka", position: "Midfielder", teamId: itTeam.id, price: 7.2, points: 42 },
    { name: "OEO", position: "Midfielder", teamId: itTeam.id, price: 7.0, points: 40 },
    { name: "Fadex", position: "Midfielder", teamId: itTeam.id, price: 6.8, points: 38 },
    { name: "Ope", position: "Midfielder", teamId: itTeam.id, price: 6.5, points: 36 },
    { name: "Grant", position: "Midfielder", teamId: itTeam.id, price: 6.3, points: 34 },
    { name: "Enoch", position: "Midfielder", teamId: itTeam.id, price: 6.0, points: 32 },
    { name: "Spidey", position: "Forward", teamId: itTeam.id, price: 8.5, points: 50 },
    { name: "Bishop", position: "Forward", teamId: itTeam.id, price: 8.0, points: 45 },
    { name: "Popo", position: "Forward", teamId: itTeam.id, price: 7.5, points: 40 },
    { name: "Zico", position: "Forward", teamId: itTeam.id, price: 7.0, points: 35 },

    // Accounting
    { name: "Mark", position: "Goalkeeper", teamId: accTeam.id, price: 5.0, points: 25 },
    { name: "Nifemi", position: "Goalkeeper", teamId: accTeam.id, price: 4.5, points: 20 },
    { name: "Chizi", position: "Defender", teamId: accTeam.id, price: 5.5, points: 30 },
    { name: "Saviour", position: "Defender", teamId: accTeam.id, price: 5.0, points: 28 },
    { name: "Jiga", position: "Defender", teamId: accTeam.id, price: 4.8, points: 26 },
    { name: "Drizzy", position: "Defender", teamId: accTeam.id, price: 4.5, points: 24 },
    { name: "Caleb", position: "Defender", teamId: accTeam.id, price: 4.3, points: 22 },
    { name: "Ebuka", position: "Defender", teamId: accTeam.id, price: 4.0, points: 20 },
    { name: "Ope", position: "Defender", teamId: accTeam.id, price: 3.8, points: 18 },
    { name: "Wisdom", position: "Midfielder", teamId: accTeam.id, price: 7.5, points: 45 },
    { name: "Bryan", position: "Midfielder", teamId: accTeam.id, price: 7.2, points: 42 },
    { name: "Batam", position: "Midfielder", teamId: accTeam.id, price: 7.0, points: 40 },
    { name: "Dami", position: "Midfielder", teamId: accTeam.id, price: 6.8, points: 38 },
    { name: "Darasimi", position: "Midfielder", teamId: accTeam.id, price: 6.5, points: 36 },
    { name: "Maru", position: "Forward", teamId: accTeam.id, price: 8.5, points: 50 },
    { name: "Korex", position: "Forward", teamId: accTeam.id, price: 8.0, points: 45 },
    { name: "Demilade", position: "Forward", teamId: accTeam.id, price: 7.5, points: 40 },
    { name: "Emma", position: "Forward", teamId: accTeam.id, price: 7.0, points: 35 },
    { name: "Otto", position: "Forward", teamId: accTeam.id, price: 6.5, points: 30 },

    // Cybersecurity
    { name: "Onana", position: "Goalkeeper", teamId: cybTeam.id, price: 5.0, points: 25 },
    { name: "Dogo", position: "Goalkeeper", teamId: cybTeam.id, price: 4.5, points: 20 },
    { name: "Panky", position: "Defender", teamId: cybTeam.id, price: 5.5, points: 30 },
    { name: "Lamba", position: "Defender", teamId: cybTeam.id, price: 5.0, points: 28 },
    { name: "Oyin", position: "Defender", teamId: cybTeam.id, price: 4.8, points: 26 },
    { name: "Hunter", position: "Defender", teamId: cybTeam.id, price: 4.5, points: 24 },
    { name: "Bolu", position: "Defender", teamId: cybTeam.id, price: 4.3, points: 22 },
    { name: "Kitan", position: "Defender", teamId: cybTeam.id, price: 4.0, points: 20 },
    { name: "Shabi", position: "Midfielder", teamId: cybTeam.id, price: 7.5, points: 45 },
    { name: "Caleb", position: "Midfielder", teamId: cybTeam.id, price: 7.2, points: 42 },
    { name: "Isaac", position: "Midfielder", teamId: cybTeam.id, price: 7.0, points: 40 },
    { name: "Layi", position: "Midfielder", teamId: cybTeam.id, price: 6.8, points: 38 },
    { name: "Commando", position: "Midfielder", teamId: cybTeam.id, price: 6.5, points: 36 },
    { name: "Adeife", position: "Midfielder", teamId: cybTeam.id, price: 6.3, points: 34 },
    { name: "Neymar", position: "Midfielder", teamId: cybTeam.id, price: 6.0, points: 32 },
    { name: "Bobo", position: "Midfielder", teamId: cybTeam.id, price: 5.8, points: 30 },
    { name: "Sonic", position: "Midfielder", teamId: cybTeam.id, price: 5.5, points: 28 },
    { name: "John", position: "Midfielder", teamId: cybTeam.id, price: 5.3, points: 26 },
    { name: "Boniface", position: "Forward", teamId: cybTeam.id, price: 8.5, points: 50 },
    { name: "Dunmomi", position: "Forward", teamId: cybTeam.id, price: 8.0, points: 45 },
  ]

  for (const player of players) {
    await prisma.player.upsert({
      where: {
        name_teamId: {
          name: player.name,
          teamId: player.teamId,
        },
      },
      update: {},
      create: player,
    })
  }

  console.log("Players created")

  // Create gameweeks
  const now = new Date()

  for (let i = 1; i <= 10; i++) {
    const startDate = new Date(now)
    startDate.setDate(now.getDate() + (i - 1) * 7)

    const endDate = new Date(startDate)
    endDate.setDate(startDate.getDate() + 6)

    await prisma.gameweek.upsert({
      where: { number: i },
      update: {},
      create: {
        number: i,
        startDate,
        endDate,
        isActive: i === 1,
        isCompleted: false,
      },
    })
  }

  console.log("Gameweeks created")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

