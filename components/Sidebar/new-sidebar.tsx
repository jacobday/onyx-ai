"use client";

import { useRouter } from "next/navigation";

import styles from "./sidebar.module.scss";
import { tools } from "@/constants";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import ListItem from "./ListItem/list-item";
import { getFavorites } from "@/lib/favorites";

const navItems = [
  {
    label: "All",
    href: "/all",
    tools,
  },
  {
    label: "Favorites",
    href: "/favorites",
    tools,
  },
];

interface NewSidebarProps {
  isPro: boolean;
  apiLimitCount: number;
  favoriteTools: string[];
}

const NewSidebar = ({
  isPro,
  apiLimitCount,
  favoriteTools,
}: NewSidebarProps) => {
  const [activeNav, setActiveNav] = useState("/all");

  return (
    <aside className={styles.sidebar}>
      {/* Navigation */}
      <nav className={styles.nav} aria-label="tabs">
        {/* Nav Tabs */}
        <div className={styles.container}>
          {navItems.map((item) => (
            <button
              key={item.label}
              aria-current={activeNav === item.href ? "page" : undefined}
              onClick={() => setActiveNav(item.href)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Tool List */}
      <div className={styles.list}>
        {/* All Tools */}
        {activeNav === "/all" &&
          navItems[0].tools.map((tool) => (
            <ListItem
              key={tool.href}
              tool={tool}
              isFavorite={favoriteTools.includes(tool.href)}
            />
          ))}

        {/* Favorite Tools */}
        {activeNav === "/favorites" &&
          (navItems[1].tools.length > 0 ? (
            navItems[1].tools
              .filter((tool) => favoriteTools.includes(tool.href))
              .map((tool) => (
                <ListItem key={tool.href} tool={tool} isFavorite />
              ))
          ) : (
            <p className={styles.empty}>
              You don't have any favorite tools yet.
            </p>
          ))}
      </div>
    </aside>
  );
};

export default NewSidebar;
