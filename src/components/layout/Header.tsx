import styles from "@/styles/components/layout/Header.module.css";


interface headerProps {
  name: string;
  stuId: string;
  email: string;
  isLogin: boolean;
}

export const Header = ({ name, stuId, email, isLogin }: headerProps) => {
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
          <p className={styles.searchText}>통합 검색</p>
          <div className={styles.searchIcon}></div>
        </div>
      </div>
      <div className={styles.user}>
        <div className={styles.userWrap}>
          <div className={styles.userInfo}>
            <div className={styles.userInfoWrap}>
              <p className={styles.userName}>{name}</p>
              <div className={styles.check}>
                <div
                  style={{
                    width: '7px',
                    height: '5px',
                    flexShrink: '0',
                    aspectRatio: '7/5',
                    backgroundImage: 'url("/assets/icon/check.svg")',
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
              </div>
            </div>
            <p className={styles.userEmail}>{email}</p>
          </div>
          <div className={styles.userProfile}></div>
        </div>
      </div>
    </div>
  );
};
