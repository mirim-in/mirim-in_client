import { MainTag } from "@/components/common/MainTag";
import styles from "@/styles/apps/(main)/page.module.css";
import { TagGroup } from "@/components/common/Tag";

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

export default function Home() {
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
          <p>인기 질문</p>
          <TagGroup tags={POPULAR_SORTS} />
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
