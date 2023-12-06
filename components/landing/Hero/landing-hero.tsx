"use client";

import { useAuth } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import styles from "./hero.module.scss";
import { Gradient } from "./Gradient";
import { useEffect } from "react";

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const gradient = new Gradient();
    gradient.initGradient("#gradient-canvas");
    // gradient.connect();
    // gradient.init();
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        {/* Gradient */}
        <div className={styles.gradient}>
          <canvas id="gradient-canvas" data-transition-in />
        </div>

        <div className={styles.textContainer}>
          <h1 className={styles.heading}>Onyx</h1>
          <h2>All of your favorite AI tools in one unified platform.</h2>
        </div>
      </div>
    </section>
  );
};
