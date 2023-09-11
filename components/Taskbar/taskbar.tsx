"use client";

import styles from "./taskbar.module.scss";
import Link from "next/link";
import { Gauge, User } from "lucide-react";
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
}

const TaskBar = ({ isPro }: TaskBarProps) => {
  const router = useRouter();
  const pathname = usePathname();

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
        </div>
      </nav>
    </div>
  );
};

export default TaskBar;
