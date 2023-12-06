"use client";

import styles from "./hero.module.scss";
import { Gradient } from "./Gradient";
import { useEffect } from "react";

export const LandingHero = () => {
  useEffect(() => {
    const gradient = new Gradient();
    gradient.initGradient("#gradient-canvas");
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
          <h2>
            All of your favorite AI tools under a single unified platform.
          </h2>
        </div>
      </div>
    </section>
  );
};
