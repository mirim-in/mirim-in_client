"use client";

import styles from "@/styles/components/common/Tag.module.css";
import { useState } from "react";

interface Props {
  isSelect: boolean;
  text: string;
  onClick?: () => void;
}

export const Tag = ({ isSelect, text, onClick }: Props) => (
  <button
    type="button"
    className={`${styles.wrap} ${isSelect ? styles.select : ""}`}
    onClick={onClick}
    aria-pressed={isSelect}
  >
    <span className={`${styles.text} ${isSelect ? styles.select : ""}`}>
      {text}
    </span>
  </button>
);

interface TagGroupProps {
  tags: string[];
  onChange?: (tag: string, index: number) => void;
}

export const TagGroup = ({ tags, onChange }: TagGroupProps) => {
  const [selected, setSelected] = useState(0);

  return (
    <div className={styles.group}>
      {tags.map((tag, i) => (
        <Tag
          key={tag}
          text={tag}
          isSelect={selected === i}
          onClick={() => {
            setSelected(i);
            onChange?.(tag, i);
          }}
        />
      ))}
    </div>
  );
};
