import styles from "@/styles/apps/(auth)/layout.module.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.page}>
      <div className={styles.card}>{children}</div>
    </div>
  );
}
