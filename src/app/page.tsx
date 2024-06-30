"use client"
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center relative">
    <div className="max-w-2xl mx-auto p-4 relative z-20">
      <h1 className="text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">
        Welcome to minTunes
      </h1>
      <div className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center">
        <p>Create NFT's with your voice</p>
        <p>
          Just record yourself singing your favourite song, a movie dialgoue or just how are you feeling today
          
          <br />
          we'll create an image for that and list it at our marketplace.
          <br />
          We won't judge you, trust me 🤗
        </p>
      </div>
      <div className="mt-6 text-center">
        <Button
          variant={"default"}
          onClick={()=>router.push('/home')}
          className= " z-30"
        >
          Let's get Started
        </Button>
      </div>
    </div>
    <div className="absolute inset-0 z-10">
      <BackgroundBeams />
    </div>
  </main>
  );
}
