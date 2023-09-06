import Navbar from "@/components/navbar";
import NewSidebar from "@/components/Sidebar/new-sidebar";
import Sidebar from "@/components/sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { getFavorites } from "@/lib/favorites";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();
  const favoriteTools = await getFavorites();

  return (
    <div className="h-full relative">
      {/* Sidebar */}
      <NewSidebar
        isPro={isPro}
        apiLimitCount={apiLimitCount}
        favoriteTools={favoriteTools}
      />

      <main className="md:pl-72 pb-10">
        <Navbar isPro={isPro} apiLimitCount={apiLimitCount} />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
