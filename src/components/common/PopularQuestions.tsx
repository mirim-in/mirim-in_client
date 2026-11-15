"use client";

import { useRef, useState } from "react";
import styles from "@/styles/apps/(main)/page.module.css";
import { TagGroup } from "@/components/common/Tag";
import { Question } from "@/components/common/Question";
import { Pagination } from "@/components/common/Pagination";
import { POPULAR_SORTS, type PopularSort } from "@/constants/popularSorts";

const QUESTION_ROWS = 3;
const PAGE_SIZE = QUESTION_ROWS * 2;
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

interface PopularQuestionPage {
  content: PopularQuestion[];
  totalPages: number;
}

// 인기질문 불러오기 (탭/페이지 변경 시 브라우저에서 호출)
// page는 API 기준 0부터 시작
const getPopularQuestions = async (
  sort: PopularSort,
  page: number,
): Promise<PopularQuestionPage> => {
  try {
    const params = new URLSearchParams({
      period: sort,
      page: String(page),
      size: String(PAGE_SIZE),
    });
    const res = await fetch(`${API_URL}/api/questions/popular?${params}`, {
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

interface Props {
  initialQuestions: PopularQuestion[];
  initialTotalPages: number;
}

export const PopularQuestions = ({
  initialQuestions,
  initialTotalPages,
}: Props) => {
  const [sort, setSort] = useState<PopularSort>(POPULAR_SORTS[0].value);
  const [page, setPage] = useState(0);
  const [questions, setQuestions] = useState(initialQuestions);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  // 탭/페이지를 빠르게 연속으로 눌렀을 때, 늦게 도착한 이전 응답이 덮어쓰지 않도록
  const latestRequest = useRef(0);

  const load = async (nextSort: PopularSort, nextPage: number) => {
    setSort(nextSort);
    setPage(nextPage);
    const requestId = ++latestRequest.current;
    const data = await getPopularQuestions(nextSort, nextPage);
    if (requestId === latestRequest.current) {
      setQuestions(data.content);
      setTotalPages(data.totalPages);
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
          onChange={(_, i) => load(POPULAR_SORTS[i].value, 0)}
        />
      </div>
      <div className={styles.questionWrap}>
        {questions.length > 0 ? (
          columns.map((column, col) => (
            <div key={col} className={styles.questionColumn}>
              {column.map((q, i) => (
                <Question
                  key={q.id}
                  num={page * PAGE_SIZE + col * QUESTION_ROWS + i + 1}
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
      {totalPages > 0 && (
        <div className={styles.pagenationWrap}>
          {/* 정렬이 바뀌면 key가 바뀌어 Pagination이 1페이지로 초기화됨 */}
          <Pagination
            key={sort}
            totalPages={totalPages}
            onChange={(p) => load(sort, p - 1)}
          />
        </div>
      )}
    </div>
  );
};
