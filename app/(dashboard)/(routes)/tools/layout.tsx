import Navbar from "@/components/navbar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { getFavorites } from "@/lib/favorites";

import styles from "./tools.module.scss";
import ListView from "@/components/ListView/listview";

const ToolsLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();
  const favoriteTools = await getFavorites();

  return (
    <div className={styles.tools}>
      {/* Sidebar */}
      <ListView
        apiLimitCount={apiLimitCount}
        isPro={isPro}
        favoriteTools={favoriteTools}
      />
      {/* Page Content */}
      <main className={styles.content}>{children}</main>
    </div>
  );
};

export default ToolsLayout;
