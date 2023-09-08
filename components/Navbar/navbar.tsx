"use client";

import { UserButton } from "@clerk/clerk-react";

import MobileSidebar from "../MobileSidebar/mobile-sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import styles from "./navbar.module.scss";
import { CreditCounter } from "../CreditCounter/credit-counter";
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

interface NavbarProps {
  apiLimitCount: number;
  isPro: boolean;
  favoriteTools: string[];
}

const Navbar = ({ apiLimitCount, isPro, favoriteTools }: NavbarProps) => {
  const mobileSidebar = useMobileSidebar();

  return (
    <nav className={styles.navbar}>
      {/* Mobile Hamburger Menu */}
      <div className="md:hidden">
        {/* <button onClick={() => mobileSidebar.onOpen()}>
          <Menu />
        </button> */}

        <MobileSidebar isPro={isPro} favoriteTools={favoriteTools} />
      </div>

      {/* Free Trial Credit Counter */}
      <div className={styles.credit}>
        <CreditCounter isPro={isPro} apiLimitCount={apiLimitCount} />
      </div>

      {/* Sign-Out Button */}
      <div className="flex justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
};

export default Navbar;
