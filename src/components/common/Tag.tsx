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
  defaultIndex?: number;
}

export const TagGroup = ({ tags, onChange, defaultIndex = 0 }: TagGroupProps) => {
  const [selected, setSelected] = useState(defaultIndex);

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

interface SmallTagGroupProps {
  tags: string[];
}
interface SmallTagProps {
  text: string;
}

export const SmallTag = ({ text }: SmallTagProps) => {
  return (
    <span className={styles.smallTagWrap}>
      <span className={styles.smallTagText}>{text}</span>
    </span>
  );
};
export const SmallTagGroup = ({ tags }: SmallTagGroupProps) => {
  return (
    <div className={styles.smallGroup}>
      {tags.map((tag, i) => (
        <SmallTag key={`${tag}-${i}`} text={tag} />
      ))}
    </div>
  );
};
