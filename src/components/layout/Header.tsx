"use client";
import styles from "@/styles/components/layout/Header.module.css";
import Link from "next/link";

interface headerProps {
  name: string;
  stuId: string;
  email: string;
  isLogin: boolean;
}

export const Header = ({ name, stuId, email, isLogin }: headerProps) => {
  const search = () => {};
  return (
    <div className={styles.header}>
      <div className={styles.logoWrap}>
        <div className={styles.logo}></div>
        <div className={styles.logoTextWrap}>
          <span className={styles.logoText}>미림</span>
          <span className={styles.logoTextSub}>iN</span>
        </div>
      </div>
      <div className={styles.search}>
        <div className={styles.searchWrap}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="통합 검색"
          />
          <div className={styles.searchIcon} onClick={search}></div>
        </div>
      </div>
      <div className={styles.user}>
        <div className={styles.userWrap}>
          <div className={styles.userInfo}>
            {isLogin ? (
              <>
                <div className={styles.userInfoWrap}>
                  <p className={styles.userName}>{name}</p>
                  <div className={styles.check}>
                    <div
                      style={{
                        width: "7px",
                        height: "5px",
                        flexShrink: 0,
                        aspectRatio: "7/5",
                        backgroundImage: 'url("/assets/icon/check.svg")',
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></div>
                  </div>
                </div>
                <p className={styles.userEmail}>{email}</p>
              </>
            ) : (
              <Link
                href="/login"
                style={{
                  textDecoration: "none",
                  color: "var(--darkgray, #666)",
                }}
                className={styles.userName}
              >
                로그인
              </Link>
            )}
          </div>
          <div className={styles.userProfile}></div>
        </div>
      </div>
    </div>
  );
};
