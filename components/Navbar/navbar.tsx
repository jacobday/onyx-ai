"use client";

import { UserButton } from "@clerk/clerk-react";

import MobileSidebar from "../MobileSidebar/mobile-sidebar";
import { CreditCounter } from "../CreditCounter/credit-counter";
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";

import styles from "./navbar.module.scss";

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
