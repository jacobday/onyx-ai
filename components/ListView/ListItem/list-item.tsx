"use client";

import { StarIcon } from "lucide-react";
import styles from "./list-item.module.scss";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";

interface ListItemProps {
  tool: {
    label: string;
    description: string;
    href: string;
    bgColor: string;
    color: string;
    icon: any;
  };
  isFavorite?: boolean;
}

const ListItem = ({ tool, isFavorite }: ListItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const mobileSidebar = useMobileSidebar();
  const [isLoading, setIsLoading] = useState(false);
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      setIsFavoriteState(!isFavoriteState);

      await axios.post("/api/favorites", { favorite: tool.href });
    } catch (error: any) {
      console.log(error);
    } finally {
      router.refresh();
      setIsLoading(false);
    }
  };

  return (
    <button
      key={tool.href}
      onClick={() => {
        router.push(tool.href);
        mobileSidebar.onClose();
      }}
      className={styles.tool}
      aria-current={pathname === tool.href ? "page" : undefined}
    >
      {/* Tool Icon */}
      <div className={cn(styles.icon, tool.bgColor)}>
        <tool.icon className={tool.color} />
      </div>

      {/* Tool Header & Description */}
      <div>
        <h3>{tool.label}</h3>
        <p>{tool.description}</p>
      </div>

      {/* Favorite Button */}
      <StarIcon
        className={styles.favoriteIcon}
        onClick={() => {
          if (!isLoading) onSubmit();
        }}
        fill={isFavorite || isFavoriteState ? "#efa561" : "none"}
        stroke={isFavorite || isFavoriteState ? "transparent" : "#e8eaf2"}
        strokeWidth={1.75}
      />
    </button>
  );
};

export default ListItem;
