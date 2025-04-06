import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { z } from "zod"

// Define validation schema
const playerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  position: z.enum(["Goalkeeper", "Defender", "Midfielder", "Forward"]),
  teamId: z.string().min(1, "Team is required"),
  price: z.number().min(0, "Price must be at least 0"),
  points: z.number().min(0, "Points must be at least 0"),
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()

    // Validate input
    const result = playerSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: "Invalid input", details: result.error.flatten() }, { status: 400 })
    }

    const { name, position, teamId, price, points } = result.data

    // Create player
    const player = await db.player.create({
      data: {
        name,
        position,
        teamId,
        price,
        points,
      },
    })

    return NextResponse.json(player, { status: 201 })
  } catch (error) {
    console.error("Create player error:", error)
    return NextResponse.json({ error: "An error occurred while creating the player" }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const players = await db.player.findMany({
      include: {
        team: true,
      },
    })

    return NextResponse.json(players)
  } catch (error) {
    console.error("Get players error:", error)
    return NextResponse.json({ error: "An error occurred while fetching players" }, { status: 500 })
  }
}

