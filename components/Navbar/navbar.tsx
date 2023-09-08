"use client";

import { UserButton } from "@clerk/clerk-react";

import MobileSidebar from "../mobile-sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import styles from "./navbar.module.scss";
import { CreditCounter } from "../CreditCounter/credit-counter";

interface NavbarProps {
  apiLimitCount: number;
  isPro: boolean;
}

const Navbar = ({ apiLimitCount, isPro }: NavbarProps) => {
  return (
    <nav className={styles.navbar}>
      {/* Mobile Hamburger Menu */}
      <div className="md:hidden">
        <MobileSidebar isPro={isPro} apiLimitCount={apiLimitCount} />
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
