import Navbar from "@/components/Navbar/navbar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { getFavorites } from "@/lib/favorites";

import styles from "./dashboard.module.scss";
import TaskBar from "@/components/Taskbar/taskbar";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();
  const favoriteTools = await getFavorites();

  return (
    <div className={styles.dashboard}>
      {/* Side Navigation Bar */}
      <TaskBar
        isPro={isPro}
        apiLimitCount={apiLimitCount}
        favoriteTools={favoriteTools}
      />

      {/* Account Management Bar */}
      {/* <div className="md:hidden"> */}
      {/* <Navbar isPro={isPro} apiLimitCount={apiLimitCount} /> */}
      {/* </div> */}

      {/* Main Content */}
      {children}
    </div>
  );
};

export default DashboardLayout;
