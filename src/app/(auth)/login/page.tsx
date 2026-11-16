import Link from "next/link";
import styles from "@/styles/apps/(auth)/login.module.css";

export default function LoginPage() {
  return (
    <div className={styles.wrap}>
      <div className={styles.titleWrap}>
        <h1 className={styles.title}>로그인</h1>
        <p className={styles.sub}>학교 이메일로 로그인해 주세요.</p>
      </div>

      {/* TODO: 로그인 Server Action 연결 후 action={login} 추가, 버튼 type="submit"으로 변경 */}
      <form className={styles.form}>
        <label className={styles.field}>
          <span className={styles.label}>이메일</span>
          <input
            type="email"
            name="email"
            className={styles.input}
            placeholder="example@e-mirim.hs.kr"
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
            placeholder="비밀번호를 입력해 주세요"
            autoComplete="current-password"
            required
          />
        </label>

        <button type="button" className={styles.submit}>
          로그인
        </button>
      </form>

      <div className={styles.links}>
        <Link href="/password-reset" className={styles.link}>
          비밀번호 찾기
        </Link>
        <span className={styles.divider} aria-hidden="true" />
        <Link href="/signup" className={styles.link}>
          회원가입
        </Link>
      </div>
    </div>
  );
}
