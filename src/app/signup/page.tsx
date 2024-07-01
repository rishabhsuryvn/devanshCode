"use client"
import { AuroraBackground } from "@/components/ui/aurora-background"
import { BackgroundBeams } from "@/components/ui/background-beams"
import {motion} from 'framer-motion'

import { Button } from "@/components/ui/button"

function page() {
  const handleClick = ()=>{
    alert('hey')
  }
  return (
    <main className="flex max-h-screen flex-col items-center justify-center relative">
       <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
          Don't worry we'll implement this soon 
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
        😤
        </div>
      </motion.div>
    </AuroraBackground>
    </main>
  )
}

export default page
