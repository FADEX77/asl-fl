import type { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "@/lib/db"
import { compare } from "bcrypt"

// Mock user database for demonstration
const users = [
  {
    id: "1",
    name: "Test User",
    email: "test@example.com",
    password: "password", // In a real app, this would be hashed
    image: "/placeholder.svg?height=32&width=32",
  },
]

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Find user by email
          const user = await db.user.findUnique({
            where: { email: credentials.email },
          })

          // Check if user exists
          if (!user) {
            return null
          }

          // Check if password matches
          const passwordMatch = await compare(credentials.password, user.passwordHash)

          if (!passwordMatch) {
            return null
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  callbacks: {
    async signIn({ user, account }) {
      // Create initial team for new users
      // In a real app, you would check if the user already has a team in your database
      if (user.id) {
        // This is where you would initialize a team for a new user
        // For demonstration, we're using a mock database in team-actions.ts
      }

      return true
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub!

        // Add user role to session
        try {
          const user = await db.user.findUnique({
            where: { id: token.sub! },
          })

          if (user) {
            session.user.role = user.role
          }
        } catch (error) {
          console.error("Session callback error:", error)
        }
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
}

