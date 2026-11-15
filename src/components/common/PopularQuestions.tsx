"use client";

import { useRef, useState } from "react";
import styles from "@/styles/apps/(main)/page.module.css";
import { TagGroup } from "@/components/common/Tag";
import { Question } from "@/components/common/Question";
import { Pagination } from "@/components/common/Pagination";
import { POPULAR_SORTS, type PopularSort } from "@/constants/popularSorts";

const QUESTION_ROWS = 3;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

// 인기질문 불러오기 (탭 변경 시 브라우저에서 호출)
const getPopularQuestions = async (
  sort: PopularSort,
): Promise<PopularQuestion[]> => {
  try {
    const res = await fetch(`${API_URL}/api/questions/popular?sort=${sort}`, {
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
    return data.content ?? [];
  } catch (err) {
    console.error("인기 질문 불러오기 에러:", err);
    return [];
  }
};

interface Props {
  initialQuestions: PopularQuestion[];
}

export const PopularQuestions = ({ initialQuestions }: Props) => {
  const [questions, setQuestions] = useState(initialQuestions);
  // 탭을 빠르게 연속으로 눌렀을 때, 늦게 도착한 이전 응답이 덮어쓰지 않도록
  const latestRequest = useRef(0);

  const handleSortChange = async (index: number) => {
    const requestId = ++latestRequest.current;
    const data = await getPopularQuestions(POPULAR_SORTS[index].value);
    if (requestId === latestRequest.current) {
      setQuestions(data);
    }
  };

  const columns = [
    questions.slice(0, QUESTION_ROWS),
    questions.slice(QUESTION_ROWS, QUESTION_ROWS * 2),
  ];

  return (
    <div className={styles.popularWrap}>
      <div className={styles.titleWrap}>
        <p className={styles.title}>인기 질문</p>
        <TagGroup
          tags={POPULAR_SORTS.map((s) => s.label)}
          onChange={(_, i) => handleSortChange(i)}
        />
      </div>
      <div className={styles.questionWrap}>
        {questions.length > 0 ? (
          columns.map((column, col) => (
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
  );
};
