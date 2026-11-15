"use client";

import { useRef, useState } from "react";
import styles from "@/styles/apps/(main)/page.module.css";
import { TagGroup } from "@/components/common/Tag";
import { RecentQuestion } from "@/components/common/RecentQuestion";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const RECENT_SIZE = 5;

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

interface RecentQuestionItem {
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

// 최근 질문 불러오기 (카테고리 탭 변경 시 브라우저에서 호출)
// categoryId가 없으면 전체
const getRecentQuestions = async (
  categoryId?: number,
): Promise<RecentQuestionItem[]> => {
  try {
    const params = new URLSearchParams({ size: String(RECENT_SIZE) });
    if (categoryId !== undefined) {
      params.set("categoryId", String(categoryId));
    }
    const res = await fetch(`${API_URL}/api/questions?${params}`, {
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

interface Props {
  categories: Category[];
  initialQuestions: RecentQuestionItem[];
}

export const RecentQuestions = ({ categories, initialQuestions }: Props) => {
  const [questions, setQuestions] = useState(initialQuestions);
  // 탭을 빠르게 연속으로 눌렀을 때, 늦게 도착한 이전 응답이 덮어쓰지 않도록
  const latestRequest = useRef(0);

  const handleCategoryChange = async (index: number) => {
    const requestId = ++latestRequest.current;
    // 0번은 "전체"
    const categoryId = index === 0 ? undefined : categories[index - 1].id;
    const data = await getRecentQuestions(categoryId);
    if (requestId === latestRequest.current) {
      setQuestions(data);
    }
  };

  return (
    <div className={styles.recentQuestionWrap}>
      <p className={styles.title}>최근에 작성된 질문</p>
      <TagGroup
        tags={["전체", ...categories.map((c) => c.name)]}
        onChange={(_, i) => handleCategoryChange(i)}
      />
      <div className={styles.rqw}>
        {questions.length > 0 ? (
          questions.slice(0, RECENT_SIZE).map((r) => (
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
  );
};
