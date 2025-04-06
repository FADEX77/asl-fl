import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HomeHero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-pink-500 to-purple-600 text-white">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Welcome to All Stars League Fantasy
              </h1>
              <p className="max-w-[600px] text-white/90 md:text-xl">
                Create your dream team from Computer Science, Information Technology, Accounting, and Cybersecurity
                departments. Compete with friends and colleagues in the ultimate fantasy football experience.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/register">
                <Button size="lg" className="bg-white text-pink-600 hover:bg-white/90">
                  Get Started
                </Button>
              </Link>
              <Link href="/rules">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[300px] w-[300px] md:h-[400px] md:w-[400px]">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ALL%20STARS%20LEAGUE%20LOGO-WcTL3NyRe9uI4AMKTxOWgU6BdRwgvP.png"
                alt="All Stars League Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

