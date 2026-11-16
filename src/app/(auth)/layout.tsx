import Link from "next/link";
import styles from "@/styles/apps/(auth)/layout.module.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.page}>
      <div className={styles.wrap}>
        <Link href="/" className={styles.logoWrap}>
          <div className={styles.logo}></div>
          <div className={styles.logoTextWrap}>
            <span className={styles.logoText}>미림</span>
            <span className={styles.logoTextSub}>iN</span>
          </div>
        </Link>
        <div className={styles.card}>{children}</div>
      </div>
    </div>
  );
}
