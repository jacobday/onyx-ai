"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import styles from "./navbar.module.scss";
import { cn } from "@/lib/utils";

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav
      className={cn(
        "p-4 bg-transparent flex items-center justify-between",
        styles.nav
      )}
    >
      <div className={styles.container}>
        {/* Onyx Logo */}
        <Link href="/" className={styles.logo}>
          <div className="relative h-8 w-8 mr-2">
            <Image fill alt="Logo" src="/logo-white.svg" />
          </div>
        </Link>

        {/* Links */}
        <div className={styles.links}>
          <Link href={isSignedIn ? "/tools/conversation" : "/sign-in"}>
            <button>Dashboard</button>
          </Link>

          <Link href="https://www.youtube.com/@jacobmday" target="_blank">
            <button>Demo Video</button>
          </Link>
        </div>

        {/* Account Actions */}
        <div className={styles.account}>
          <Link href={isSignedIn ? "/tools/conversation" : "/sign-in"}>
            <button className={styles.login}>Login</button>
          </Link>

          <Link href={isSignedIn ? "/tools/conversation" : "/sign-up"}>
            <button className={styles.signup}>Sign up</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
