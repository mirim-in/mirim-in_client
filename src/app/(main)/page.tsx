import { MainTag } from "@/components/common/MainTag";
import styles from "@/styles/apps/(main)/page.module.css";
import { TagGroup } from "@/components/common/Tag";
import { Question } from "@/components/common/Question";

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

// TODO: API 연동 전 더미 데이터
const POPULAR_QUESTIONS = [
  {
    id: "1",
    title: "기숙사 생활 처음인데 꼭 챙겨야 할 물건 있나요?",
    note: "다음 달부터 기숙사에 들어가는데 이불이나 생활용품 말고 따로 준비하면 좋은 게 있을까요?",
    view: 450,
    res: 6,
  },
  {
    id: "2",
    title: "면접 때 자소서 내용 그대로 물어보나요?",
    note: "자소서에 쓴 프로젝트 경험을 구체적으로 물어본다고 들었는데 어느 정도까지 준비해야 할지 궁금합니다.",
    view: 412,
    res: 5,
  },
  {
    id: "3",
    title: "디자인과랑 소프트웨어과 수업 차이가 궁금해요",
    note: "두 과 중에 고민 중인데 1학년 때 실제로 배우는 과목이나 실습 비중이 어떻게 다른지 알고 싶어요.",
    view: 389,
    res: 8,
  },
  {
    id: "4",
    title: "현재 마이스터고 입시를 희망하는 예비 고1입니다",
    note: "현재 마이스터고 입시를 희망하는 예비 고1 (여자)입니다. 각 학과별로 준비하면 좋은 활동이 있을까요?",
    view: 356,
    res: 4,
  },
  {
    id: "5",
    title: "방과후 프로그램은 어떤 게 있나요?",
    note: "전공 관련 방과후 수업이 있다고 들었는데 신청 방법이랑 종류가 궁금합니다.",
    view: 301,
    res: 3,
  },
  {
    id: "6",
    title: "코딩 경험 없어도 소프트웨어과 괜찮을까요?",
    note: "중학교 때 코딩을 거의 안 해봤는데 입학하고 나서 따라갈 수 있을지 걱정돼요.",
    view: 287,
    res: 7,
  },
];

const QUESTION_ROWS = 3;
const QUESTION_COLUMNS = [
  POPULAR_QUESTIONS.slice(0, QUESTION_ROWS),
  POPULAR_QUESTIONS.slice(QUESTION_ROWS, QUESTION_ROWS * 2),
];

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
          <p className={styles.title}>인기 질문</p>
          <TagGroup tags={POPULAR_SORTS} />
        </div>
        <div className={styles.questionWrap}>
          {QUESTION_COLUMNS.map((column, col) => (
            <div key={col} className={styles.questionColumn}>
              {column.map((q, i) => (
                <Question
                  key={q.id}
                  num={col * QUESTION_ROWS + i + 1}
                  title={q.title}
                  note={q.note}
                  view={q.view}
                  res={q.res}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
