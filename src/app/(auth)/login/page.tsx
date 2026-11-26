import Link from "next/link";
import styles from "@/styles/apps/(auth)/login.module.css";

export default function LoginPage() {
  
  return (
    <>
      <div className={styles.header}>
        <div className={styles.emblem} role="img" aria-label="미림마이스터고 로고">
          <div className={styles.emblemImage}></div>
        </div>
        <h1 className={styles.title}>로그인</h1>
      </div>

      {/* TODO: 로그인 Server Action 연결 후 action={login} 추가, 버튼 type="submit"으로 변경 */}
      <form className={styles.form}>
        <div className={styles.fields}>
          <label className={styles.field}>
            <span className={styles.label}>이메일</span>
            <input
              type="email"
              name="email"
              className={styles.input}
              placeholder="이메일을 입력해 주세요."
              autoComplete="email"
              required
            />
          </label>
          <label className={styles.field}>
            <span className={styles.label}>비밀번호</span>
            <input
              type="password"
              name="password"
              className={styles.input}
              placeholder="비밀번호를 입력해 주세요."
              autoComplete="current-password"
              required
            />
          </label>
        </div>

        <button type="button" className={styles.submit}>
          로그인
        </button>
      </form>

      <div className={styles.social}>
        <p className={styles.socialText}>간편 로그인</p>
        {/* TODO: 구글 로그인 연결 */}
        <button
          type="button"
          className={styles.socialButton}
          aria-label="구글로 로그인"
        >
          <span className={styles.googleIcon}></span>
        </button>
      </div>

      <div className={styles.links}>
        <div className={styles.signupWrap}>
          <p className={styles.linkText}>계정이 없나요?</p>
          <Link href="/signup" className={styles.signupLink}>
            회원가입
          </Link>
        </div>
        <Link href="/password-reset" className={styles.findPassword}>
          비밀번호를 잊으셨나요?
        </Link>
      </div>
    </>
  );
}
