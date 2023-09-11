import styles from "./dashboard.module.scss";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.dashboard}>
      {/* Main Content */}
      {children}
    </div>
  );
};

export default DashboardLayout;
