import styles from "./content-container.module.scss";

export const ContentContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
