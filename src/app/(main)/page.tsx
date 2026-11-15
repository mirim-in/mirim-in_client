import { MainTag } from "@/components/common/MainTag";
import styles from "@/styles/apps/(main)/page.module.css";
import "@/styles/globals.css";
import { TagGroup } from "@/components/common/Tag";
import { Question } from "@/components/common/Question";
import { Pagination } from "@/components/common/Pagination";
import { RecentQuestion } from "@/components/common/RecentQuestion";
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
    // console.log(data.content);
    return data.content ?? [];
  } catch (err) {
    console.error("인기 질문 불러오기 에러:", err);
    return [];
  }
};
interface Category {
  id: number;
  name: string;
  official: boolean;
}
const getTags = async (): Promise<Category[]> => {
  try {
    const res = await fetch(`${API_URL}/api/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(`API 요청 실패: ${res.status}`);
    }
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (err) {
    console.log("태그 불러오기 에러 : ", err);
    return [];
  }
};

interface RecentQuestionProps {
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
const getRecentQuestions = async (): Promise<RecentQuestionProps[]> => {
  try {
    const res = await fetch(`${API_URL}/api/questions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(`API 요청 실패: ${res.status}`);
    }
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log("최근 질문 불러오기 실패", err);
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
  const tags_obj = await getTags();
  const tags_arr = tags_obj.map((t) => t.name);
  const recentQuestions = await getRecentQuestions();
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
              <p>작성된 질문이 존재하지 않습니다.</p>
            </div>
          )}
        </div>
        <div className={styles.pagenationWrap}>
          <Pagination totalPages={10} />
        </div>
      </div>
      <div className={styles.recentQuestionWrap}>
        <p className={styles.title}>최근에 작성된 질문</p>
        <TagGroup tags={["전체", ...tags_arr]} />
        <div className={styles.rqw}>
          {recentQuestions.length > 0 ? (
            recentQuestions.slice(0, 5).map((r) => (
              <RecentQuestion
                key={r.id}
                id={r.id}
                title={r.title}
                preview={r.preview}
                anonymous={r.anonymous}
                status={r.status}
                author={r.author}
                categories={r.categories}
                viewCount={r.viewCount}
                answerCount={r.answerCount}
                publishedAt={r.publishedAt}
              />
            ))
          ) : (
            <div className={styles.notExists}>
              <p>작성된 질문이 존재하지 않습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
