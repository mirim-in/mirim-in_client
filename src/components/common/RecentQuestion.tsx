import styles from "@/styles/components/common/RecentQuestion.module.css";
import { SmallTagGroup } from "./Tag";
import Link from "next/link";

interface Author {
  id: number;
  name: string;
  profileImageUrl: string;
  memberTypeLabel: string;
  verified: boolean;
  departmentLabel: string;
  withdrawn: boolean;
}

interface Category {
  id: number;
  name: string;
  official: boolean;
}

interface Props {
  id: string | number;
  title: string;
  preview: string;
  anonymous: boolean;
  status: string;
  author: Author | null;
  categories: Category[];
  viewCount: number;
  answerCount: number;
  publishedAt: string;
}
export const RecentQuestion = ({
  id,
  title,
  preview,
  anonymous,
  status,
  author,
  categories,
  viewCount,
  answerCount,
  publishedAt,
}: Props) => {
  // "2026-09-22T..." → "26.09.22"
  const publish = publishedAt.slice(2, 10).split("-").join(".");
  return (
    <Link href={`/question/${id}`} className={styles.wrap}>
      <div className={styles.left}>
        <div className={styles.titleWrap}>
          <p className={styles.title}>{title}</p>
          <div
            className={styles.tag}
            style={
              status.toLowerCase() === "resolved"
                ? {
                    backgroundColor: "var(--light-green, #E6F1E9)",
                  }
                : { backgroundColor: "var(--gray, #F8F7F7)" }
            }
          >
            {status.toLowerCase() === "resolved" ? (
              <p className={styles.tagText} style={{ color: "#007F59" }}>
                채택 완료
              </p>
            ) : (
              <p className={styles.tagText} style={{ color: "#666" }}>
                답변 대기
              </p>
            )}
          </div>
        </div>
        <p className={styles.preview}>{preview}</p>
        <div className={styles.infoWrap}>
          <SmallTagGroup tags={categories.map((c) => c.name)} />
          <div className={styles.dateWrap}>
            <p className={styles.dateText}>{publish}</p>
            <p className={styles.dateText}>조회 {viewCount}</p>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.answerWrap}>
          <p className={styles.answerCount}>{answerCount}</p>
          <p className={styles.answerNote}>답변</p>
        </div>
      </div>
    </Link>
  );
};
