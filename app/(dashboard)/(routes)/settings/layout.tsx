import TaskBar from "@/components/Taskbar/taskbar";
import { checkSubscription } from "@/lib/subscription";

const SettingsLayout = async ({ children }: { children: React.ReactNode }) => {
  const isPro = await checkSubscription();

  return (
    <>
      <TaskBar isPro={isPro} />

      <main>{children}</main>
    </>
  );
};

export default SettingsLayout;
