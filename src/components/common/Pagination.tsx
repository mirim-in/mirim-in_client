"use client";

import styles from "@/styles/components/common/Pagination.module.css";
import { useState } from "react";

const PAGE_GROUP = 5;

interface Props {
  totalPages: number;
  onChange?: (page: number) => void;
}

export const Pagination = ({ totalPages, onChange }: Props) => {
  const [page, setPage] = useState(1);

  const start = Math.floor((page - 1) / PAGE_GROUP) * PAGE_GROUP + 1;
  const end = Math.min(start + PAGE_GROUP - 1, totalPages);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const move = (next: number) => {
    if (next < 1 || next > totalPages || next === page) return;
    setPage(next);
    onChange?.(next);
  };

  return (
    <nav className={styles.wrap} aria-label="페이지 이동">
      <button
        type="button"
        className={`${styles.arrow} ${styles.prev}`}
        onClick={() => move(start - PAGE_GROUP)}
        disabled={start === 1}
        aria-label="이전 페이지"
      />
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          className={`${styles.page} ${p === page ? styles.active : ""}`}
          onClick={() => move(p)}
          aria-current={p === page ? "page" : undefined}
        >
          {p}
        </button>
      ))}
      <button
        type="button"
        className={styles.arrow}
        onClick={() => move(start + PAGE_GROUP)}
        disabled={end === totalPages}
        aria-label="다음 페이지"
      />
    </nav>
  );
};
