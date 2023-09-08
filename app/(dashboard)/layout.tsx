import { checkSubscription } from "@/lib/subscription";

import styles from "./dashboard.module.scss";
import TaskBar from "@/components/Taskbar/taskbar";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const isPro = await checkSubscription();

  return (
    <div className={styles.dashboard}>
      {/* Side Navigation Bar */}
      {/* <div className={styles.taskbar}>
        <TaskBar isPro={isPro} />
      </div> */}

      {/* Main Content */}
      {children}
    </div>
  );
};

export default DashboardLayout;
