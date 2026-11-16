import styles from "@/styles/components/common/Question.module.css";
import Link from "next/link";
interface Props {
  id: string | number;
  num: number;
  title: string;
  note: string;
  view: number;
  res: number;
}

export const Question = ({ id, num, title, note, view, res }: Props) => {
  return (
    <Link href={`/question/${id}`} className={styles.container}>
      <div className={styles.numWrap}>
        <p className={styles.num}>{num}</p>
      </div>
      <div className={styles.bodyWrap}>
        <p className={styles.title}>{title}</p>
        <div className={styles.noteWrap}>
          <p className={styles.note}>{note}</p>
        </div>
        <div className={styles.infoWrap}>
          <p className={styles.view}>조회 {view}</p>
          <p className={styles.res}>답변 {res}</p>
        </div>
      </div>
    </Link>
  );
};
