import styles from "./landing.module.scss";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return <main className={styles.landing}>{children}</main>;
};

export default LandingLayout;
