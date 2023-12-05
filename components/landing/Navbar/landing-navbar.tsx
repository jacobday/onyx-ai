"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import styles from "./navbar.module.scss";

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      {/* Onyx Logo */}
      <Link href="/" className={styles.logo}>
        <div className="relative h-8 w-8 mr-2">
          <Image fill alt="Logo" src="/logo.svg" />
        </div>

        <h1 className="text-2xl font-bold text-white">Onyx</h1>
      </Link>

      <div className={styles.account}>
        {!isSignedIn && (
          <>
            <Link href="/sign-in">
              <button className={styles.login}>Login</button>
            </Link>

            <Link href="/sign-up">
              <button className={styles.signup}>Sign Up</button>
            </Link>
          </>
        )}

        {isSignedIn && (
          <Link href="/tools/conversation">
            <button className={styles.signup}>Dashboard</button>
          </Link>
        )}
      </div>
    </nav>
  );
};
