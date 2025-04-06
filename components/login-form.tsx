"use client"

import type React from "react"

import { useState } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isResetMode, setIsResetMode] = useState(false)
  const [resetEmail, setResetEmail] = useState("")
  const [resetCode, setResetCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [resetStep, setResetStep] = useState<"email" | "code" | "password">("email")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid email or password")
        return
      }

      window.location.href = "/dashboard"
    } catch (error) {
      setError("An error occurred during sign in. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      if (resetStep === "email") {
        // Request password reset
        const response = await fetch("/api/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: resetEmail }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Failed to send reset code")
        }

        toast({
          title: "Reset Code Sent",
          description: "A reset code has been sent to your email address.",
        })

        // For demo purposes, we're using the token returned from the API
        // In a real app, the user would get this via email
        if (data.token) {
          setResetCode(data.token)
        }

        setResetStep("code")
      } else if (resetStep === "code") {
        // Verify reset code
        setResetStep("password")
      } else if (resetStep === "password") {
        // Reset password
        const response = await fetch("/api/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token: resetCode,
            password: newPassword,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Failed to reset password")
        }

        toast({
          title: "Password Reset",
          description: "Your password has been reset successfully. You can now log in with your new password.",
        })

        setIsResetMode(false)
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isResetMode) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ALL%20STARS%20LEAGUE%20LOGO-WcTL3NyRe9uI4AMKTxOWgU6BdRwgvP.png"
              alt="All Stars League Logo"
              width={80}
              height={80}
              className="rounded-md"
            />
          </div>
          <CardTitle className="text-2xl text-center">Reset Password</CardTitle>
          <CardDescription className="text-center">
            {resetStep === "email" && "Enter your email to receive a reset code"}
            {resetStep === "code" && "Enter the reset code sent to your email"}
            {resetStep === "password" && "Enter your new password"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleResetPassword} className="space-y-4">
            {resetStep === "email" && (
              <div className="space-y-2">
                <Label htmlFor="reset-email">Email</Label>
                <Input
                  id="reset-email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  type="email"
                  placeholder="m@example.com"
                  required
                  disabled={isLoading}
                />
              </div>
            )}

            {resetStep === "code" && (
              <div className="space-y-2">
                <Label htmlFor="reset-code">Reset Code</Label>
                <Input
                  id="reset-code"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  placeholder="Enter reset code"
                  required
                  disabled={isLoading}
                />
                <p className="text-xs text-muted-foreground">Enter the code sent to your email</p>
              </div>
            )}

            {resetStep === "password" && (
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  type="password"
                  required
                  disabled={isLoading}
                />
                <p className="text-xs text-muted-foreground">Password must be at least 8 characters long</p>
              </div>
            )}

            {error && <div className="text-sm text-red-500">{error}</div>}

            <div className="flex space-x-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setIsResetMode(false)}
                disabled={isLoading}
              >
                Back to Login
              </Button>
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading ? "Processing..." : "Continue"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <div className="flex justify-center mb-4">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ALL%20STARS%20LEAGUE%20LOGO-WcTL3NyRe9uI4AMKTxOWgU6BdRwgvP.png"
            alt="All Stars League Logo"
            width={80}
            height={80}
            className="rounded-md"
          />
        </div>
        <CardTitle className="text-2xl text-center">Sign in</CardTitle>
        <CardDescription className="text-center">Enter your email and password to access your account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="m@example.com" required disabled={isLoading} />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Button variant="link" className="p-0 h-auto text-sm" onClick={() => setIsResetMode(true)} type="button">
                Forgot password?
              </Button>
            </div>
            <Input id="password" name="password" type="password" required disabled={isLoading} />
          </div>
          {error && <div className="text-sm text-red-500">{error}</div>}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

