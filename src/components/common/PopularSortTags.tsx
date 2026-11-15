"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TagGroup } from "@/components/common/Tag";

export const POPULAR_SORTS = [
  { label: "이번 주", value: "WEEK" },
  { label: "이번 달", value: "MONTH" },
  { label: "조회수", value: "ALL" },
] as const;

export type PopularSort = (typeof POPULAR_SORTS)[number]["value"];

export const PopularSortTags = ({ current }: { current: PopularSort }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const defaultIndex = Math.max(
    0,
    POPULAR_SORTS.findIndex((s) => s.value === current),
  );

  return (
    <TagGroup
      tags={POPULAR_SORTS.map((s) => s.label)}
      defaultIndex={defaultIndex}
      onChange={(_, i) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("sort", POPULAR_SORTS[i].value);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      }}
    />
  );
};
