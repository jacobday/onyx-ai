"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import TaskBar from "../Taskbar/taskbar";
import ListView from "../ListView/listview";

import styles from "./mobile-sidebar.module.scss";

interface MobileSidebarProps {
  isPro: boolean;
  favoriteTools: string[];
}

const MobileSidebar = ({ isPro, favoriteTools }: MobileSidebarProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const mobileSidebar = useMobileSidebar();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Sheet onOpenChange={mobileSidebar.onClose}>
      {/* Hamburger Button */}
      <SheetTrigger>
        <Button
          onClick={() => mobileSidebar.onOpen()}
          variant="ghost"
          size="icon"
          asChild
        >
          <Menu />
        </Button>
      </SheetTrigger>

      {/* Dashboard Links */}
      <SheetContent side="left" className={styles.content}>
        <TaskBar isPro={isPro} />
        <div className={styles.listview}>
          <ListView favoriteTools={favoriteTools} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
