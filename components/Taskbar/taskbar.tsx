"use client";

import Image from "next/image";

import ListView from "../ListView/listview";
import styles from "./taskbar.module.scss";
import Link from "next/link";
import { useState } from "react";
import { Gauge, Settings, Shield, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  {
    label: "Tools",
    prefix: "/tools",
    href: "/tools/conversation",
    icon: Gauge,
  },
  {
    label: "Settings",
    prefix: "/settings",
    href: "/settings",
    icon: User,
  },
];

interface TaskBarProps {
  isPro: boolean;
  apiLimitCount: number;
  favoriteTools: string[];
}

const TaskBar = ({ isPro, apiLimitCount, favoriteTools }: TaskBarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("/tools");

  return (
    <div className={styles.taskbar}>
      {/* Task Selection Bar */}
      <nav aria-label="task">
        {/* Onyx Logo */}
        <Link href="/" className={styles.logo}>
          <img src={isPro ? "/logo.svg" : "/logo-white.svg"} alt="Onyx logo" />
        </Link>

        {/* Tab Container */}
        <div className={styles.container}>
          {navItems.map((item) => (
            <button
              key={item.label}
              aria-current={
                pathname.includes(item.prefix) ? "location" : undefined
              }
              onClick={() => router.push(item.href)}
            >
              <item.icon strokeWidth={2.75} />
            </button>
          ))}

          {/* Settings Button */}
          {/* <button
            className={styles.settings}
            aria-current={pathname === "/settings" ? "location" : undefined}
            onClick={() => router.push("/settings")}
          >
            <Settings strokeWidth={2} />
          </button> */}
        </div>
      </nav>

      {/* Selected List View */}
      {/* <ListView
        isPro={isPro}
        apiLimitCount={apiLimitCount}
        favoriteTools={favoriteTools}
      /> */}
    </div>
  );
};

export default TaskBar;
