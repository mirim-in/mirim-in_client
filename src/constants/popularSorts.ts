export const POPULAR_SORTS = [
  { label: "이번 주", value: "WEEK" },
  { label: "이번 달", value: "MONTH" },
  { label: "조회수", value: "ALL" },
] as const;

export type PopularSort = (typeof POPULAR_SORTS)[number]["value"];
