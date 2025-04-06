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

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const player = await db.player.findUnique({
      where: {
        id: params.id,
      },
      include: {
        team: true,
      },
    })

    if (!player) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 })
    }

    return NextResponse.json(player)
  } catch (error) {
    console.error("Get player error:", error)
    return NextResponse.json({ error: "An error occurred while fetching the player" }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
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

    // Check if player exists
    const existingPlayer = await db.player.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!existingPlayer) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 })
    }

    // Update player
    const player = await db.player.update({
      where: {
        id: params.id,
      },
      data: {
        name,
        position,
        teamId,
        price,
        points,
      },
    })

    return NextResponse.json(player)
  } catch (error) {
    console.error("Update player error:", error)
    return NextResponse.json({ error: "An error occurred while updating the player" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if player exists
    const existingPlayer = await db.player.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!existingPlayer) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 })
    }

    // Delete player
    await db.player.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Delete player error:", error)
    return NextResponse.json({ error: "An error occurred while deleting the player" }, { status: 500 })
  }
}

