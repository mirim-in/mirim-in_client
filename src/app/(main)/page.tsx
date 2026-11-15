import { MainTag } from "@/components/common/MainTag";
import styles from "@/styles/apps/(main)/page.module.css";
import "@/styles/globals.css";
import { PopularQuestions } from "@/components/common/PopularQuestions";
import { RecentQuestions } from "@/components/common/RecentQuestions";
import { POPULAR_SORTS, type PopularSort } from "@/constants/popularSorts";

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

const API_URL = process.env.NEXT_PUBLIC_API_URL;
// 인기질문 불러오기 (첫 화면용)
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

interface PopularQuestionPage {
  content: PopularQuestion[];
  totalPages: number;
}

const getPopularQuestions = async (
  sort: PopularSort,
): Promise<PopularQuestionPage> => {
  try {
    const res = await fetch(`${API_URL}/api/questions/popular?period=${sort}&page=0&size=6`, {
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
    return { content: data.content ?? [], totalPages: data.totalPages ?? 0 };
  } catch (err) {
    console.error("인기 질문 불러오기 에러:", err);
    return { content: [], totalPages: 0 };
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
    const res = await fetch(`${API_URL}/api/questions?size=5`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(`API 요청 실패: ${res.status}`);
    }
    const data = await res.json();
    return data.content ?? [];
  } catch (err) {
    console.log("최근 질문 불러오기 실패", err);
    return [];
  }
};

export default async function Home() {
  const popularQuestions = await getPopularQuestions(POPULAR_SORTS[0].value);
  const categories = await getTags();
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
      <PopularQuestions
        initialQuestions={popularQuestions.content}
        initialTotalPages={popularQuestions.totalPages}
      />
      <RecentQuestions
        categories={categories}
        initialQuestions={recentQuestions}
      />
    </div>
  );
}
