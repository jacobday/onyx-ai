import Navbar from "@/components/Navbar/navbar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { getFavorites } from "@/lib/favorites";

import styles from "./tools.module.scss";
import ListView from "@/components/ListView/listview";
import { ContentContainer } from "@/components/ContentContainer/content-container";
import TaskBar from "@/components/Taskbar/taskbar";

const ToolsLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();
  const favoriteTools = await getFavorites();

  return (
    <div className={styles.tools}>
      {/* Navigation */}
      <div className={styles.navbar}>
        <Navbar
          isPro={isPro}
          apiLimitCount={apiLimitCount}
          favoriteTools={favoriteTools}
        />
      </div>

      <div className={styles.taskbar}>
        <TaskBar isPro={isPro} />
      </div>

      {/* Tool Selection */}
      <div className={styles.listview}>
        <ListView favoriteTools={favoriteTools} />
      </div>
      {/* Page Content */}
      <main className={styles.content}>
        <ContentContainer>{children}</ContentContainer>
      </main>
    </div>
  );
};

export default ToolsLayout;
