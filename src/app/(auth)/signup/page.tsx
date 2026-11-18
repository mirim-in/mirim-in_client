import Link from "next/link";
// 로그인과 같은 디자인이라 스타일을 공유한다
import styles from "@/styles/apps/(auth)/login.module.css";

export default function SignupPage() {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.emblem} role="img" aria-label="미림마이스터고 로고">
          <div className={styles.emblemImage}></div>
        </div>
        <h1 className={styles.title}>회원가입</h1>
      </div>

      {/* TODO: 회원가입 Server Action 연결 후 action={signup} 추가, 버튼 type="submit"으로 변경 */}
      <form className={styles.form}>
        <div className={styles.fields}>
          <label className={styles.field}>
            <span className={styles.label}>이름</span>
            <input
              type="text"
              name="name"
              className={styles.input}
              placeholder="이름을 입력해 주세요."
              autoComplete="name"
              maxLength={30}
              required
            />
          </label>
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
              autoComplete="new-password"
              minLength={8}
              maxLength={64}
              required
            />
          </label>
        </div>

        <button type="button" className={styles.submit}>
          회원가입
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
          <p className={styles.linkText}>이미 계정이 있나요?</p>
          <Link href="/login" className={styles.signupLink}>
            로그인
          </Link>
        </div>
      </div>
    </>
  );
}
