import type { User } from "next-auth"

interface DashboardHeaderProps {
  user: User | undefined
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col space-y-2">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-muted-foreground">
        Welcome back, {user?.name || "Manager"}! Here's an overview of your fantasy team.
      </p>
    </div>
  )
}

