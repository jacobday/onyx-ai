"use client";

import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "../ui/button";

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <section className="text-white font-bold py-36 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>The Best AI Tool For</h1>

        {/* Typewriter */}
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          <TypewriterComponent
            options={{
              strings: [
                "Conversations.",
                "Photo Generation.",
                "Music Generation.",
                "Video Generation.",
                "Code Generation.",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>

      {/* Subheader */}
      {/* <div className="text-sm md:text-xl font-light text-zinc-400">
        Create content faster than ever before.
      </div> */}

      {/* Get Started Button */}
      <div>
        <Link href={isSignedIn ? "/tools/conversation" : "/sign-up"}>
          <Button
            variant="premium"
            className="md:text-lg p-4 md:p-6 rounded-full font-semibold"
          >
            Start Generating For Free
          </Button>
        </Link>
      </div>
    </section>
  );
};
