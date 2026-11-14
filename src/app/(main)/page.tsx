import { MainTag } from "@/components/common/MainTag";
import styles from "@/styles/apps/(main)/page.module.css";
import { TagGroup } from "@/components/common/Tag";
import { Question } from "@/components/common/Question";
import { Pagination } from "@/components/common/Pagination";

const MAIN_TAGS = [
  {
    id: "1",
    title: ["학교 생활"],
    tags: ["학교", "수업", "기숙사"],
    image: "school",
  },
  {
    id: "2",
    title: ["입학 ", "면접"],
    tags: ["입학", "면접", "자소서"],
    image: "admission",
  },
  {
    id: "3",
    title: ["전공"],
    tags: ["Design", "Software"],
    image: "major",
  },
];

const POPULAR_SORTS = ["이번 주", "이번 달", "조회수"];
const API_URL = process.env.NEXT_PUBLIC_API_URL;
// 인기질문 불러오기
interface Author {
  id: number;
  name: string;
  profileImageUrl: string;
  memberTypeLabel: string;
  verified: boolean;
  departmentLabel: string;
  withdrawn: boolean;
}

interface PopularQuestion {
  id: string | number;
  title: string;
  preview: string;
  anonymous: boolean;
  author: Author | null;
  viewCount: number;
  answerCount: number;
}

const getPopularQuestions = async (): Promise<PopularQuestion[]> => {
  try {
    const res = await fetch(`${API_URL}/api/questions/popular`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`API 요청 실패: ${res.status}`);
    }
    const data = await res.json();
    console.log(data.content);
    return data.content ?? [];
  } catch (err) {
    console.error("인기 질문 불러오기 에러:", err);
    return [];
  }
};

const QUESTION_ROWS = 3;

export default async function Home() {
  const POPULAR_QUESTIONS = await getPopularQuestions();
  const QUESTION_COLUMNS = [
    POPULAR_QUESTIONS.slice(0, QUESTION_ROWS),
    POPULAR_QUESTIONS.slice(QUESTION_ROWS, QUESTION_ROWS * 2),
  ];

  return (
    <div className={styles.wrap}>
      <div className={styles.mainTagWrap}>
        {MAIN_TAGS.map((tag) => {
          return (
            <MainTag
              key={tag.id}
              title={tag.title}
              tags={tag.tags}
              image={tag.image}
            />
          );
        })}
      </div>
      <div className={styles.popularWrap}>
        <div className={styles.titleWrap}>
          <p className={styles.title}>인기 질문</p>
          <TagGroup tags={POPULAR_SORTS} />
        </div>
        <div className={styles.questionWrap}>
          {POPULAR_QUESTIONS.length > 0 ? (
            QUESTION_COLUMNS.map((column, col) => (
              <div key={col} className={styles.questionColumn}>
                {column.map((q, i) => (
                  <Question
                    key={q.id}
                    num={col * QUESTION_ROWS + i + 1}
                    title={q.title}
                    note={q.preview}
                    view={q.viewCount}
                    res={q.answerCount}
                  />
                ))}
              </div>
            ))
          ) : (
            <div className={styles.notExists}>
              <p>데이터가 존재하지 않습니다.</p>
            </div>
          )}
        </div>
        <div className={styles.pagenationWrap}>
          <Pagination totalPages={10} />
        </div>
      </div>
      <div></div>
    </div>
  );
}
