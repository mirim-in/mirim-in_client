import styles from "@/styles/components/common/MainTag.module.css";
import Link from "next/link";
import { Fragment } from "react";

interface Props {
  title: string[];
  tags: string[];
  image: string;
}

interface DotProps {
  className?: string;
}

const Dot = ({ className = "" }: DotProps) => (
  <span className={`${styles.dot} ${className}`} aria-hidden="true" />
);

export const MainTag = ({ title, tags, image }: Props) => {
  return (
    <Link href={"/question"}>
      <div className={styles.mainTag}>
        <div className={styles.wrap}>
          <div className={styles.textWrap}>
            <div className={styles.titleWrap}>
              {title.map((t, i) => (
                <Fragment key={t}>
                  {i > 0 && <Dot className={styles.dotTitle} />}
                  <span className={styles.title}>{t}</span>
                </Fragment>
              ))}
            </div>
            <div className={styles.tagWrap}>
              {tags.map((tag, i) => (
                <Fragment key={tag}>
                  {i > 0 && <Dot />}
                  <span className={styles.tag}>{tag}</span>
                </Fragment>
              ))}
            </div>
          </div>
          <div className={styles.imageWrap}>
            <div className={styles.imageBody}>
              <div
                className={styles.image}
                style={{ backgroundImage: `url(assets/icon/${image}.svg)` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
