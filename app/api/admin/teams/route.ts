import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { z } from "zod"

// Define validation schema
const teamSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  shortName: z.string().min(2, "Short name must be at least 2 characters"),
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()

    // Validate input
    const result = teamSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: "Invalid input", details: result.error.flatten() }, { status: 400 })
    }

    const { name, shortName } = result.data

    // Check if team with same name already exists
    const existingTeam = await db.team.findFirst({
      where: {
        OR: [{ name }, { shortName }],
      },
    })

    if (existingTeam) {
      return NextResponse.json({ error: "Team with this name or short name already exists" }, { status: 409 })
    }

    // Create team
    const team = await db.team.create({
      data: {
        name,
        shortName,
      },
    })

    return NextResponse.json(team, { status: 201 })
  } catch (error) {
    console.error("Create team error:", error)
    return NextResponse.json({ error: "An error occurred while creating the team" }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const teams = await db.team.findMany({
      include: {
        players: true,
      },
    })

    return NextResponse.json(teams)
  } catch (error) {
    console.error("Get teams error:", error)
    return NextResponse.json({ error: "An error occurred while fetching teams" }, { status: 500 })
  }
}

