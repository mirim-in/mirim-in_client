import styles from "@/styles/components/layout/Footer.module.css";

export const Footer = () => {
  return (
    <div className={styles.body}>
      <div className={styles.infoWrap}>
        <div className={styles.image}></div>
        <div className={styles.infoTextWrap}>
          <div className={styles.menuGrid}>
            <div className={styles.menuWrap}>
              <p className={styles.menu}>개인정보처리방침</p>
            </div>
            <div className={styles.menuWrap}>
              <p className={styles.menu}>이용약관</p>
            </div>
            <div className={styles.menuWrap}>
              <p className={styles.menu}>학교 홈페이지</p>
            </div>
          </div>
          <div className={styles.addressWrap}>
            <div className={styles.addressKRWrap}>
              <p className={styles.note}>
                (08821) 서울시 관악구 호암로 546 (신림동)
              </p>
              <p className={styles.note}>
                <b>문의</b> mirimin@example.com
              </p>
            </div>
            <div className={styles.addressEngWrap}>
              <div className={styles.addressEngItem}>
                <p className={styles.note}>
                  546 Hoam-ro, Gwanak-gu, Seoul, 08821 Korea
                </p>
              </div>
              <div className={styles.addressEngItem}>
                <p className={styles.note}>MIRIM MEISTER SCHOOL</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.mirimInLogoWrap}>
        <div></div>
        <div>
          <p>미림</p>
          <p>iN</p>
        </div>
      </div>
    </div>
  );
};
