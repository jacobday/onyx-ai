import Navbar from "@/components/Navbar/navbar";
import TaskBar from "@/components/Taskbar/taskbar";
import { getApiLimitCount } from "@/lib/api-limit";
import { getFavorites } from "@/lib/favorites";
import { checkSubscription } from "@/lib/subscription";

const SettingsLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();
  const favoriteTools = await getFavorites();

  return (
    <>
      <TaskBar isPro={isPro} />

      <main>{children}</main>
    </>
  );
};

export default SettingsLayout;
