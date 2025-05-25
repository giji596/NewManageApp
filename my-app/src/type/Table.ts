import useTableFilter from "@/hook/useTableFilter";

/**
 * テーブルのソート対象のタイプ
 */
export type TableSortTargetType = string | number | Date | null;

/**
 * 子コンポーネントに渡す用の `useTableFilter` の型定義。
 *
 * 親のみが使う `doFilterByFilterList` を除外し、フィルタ状態や操作を共有する目的で利用します。
 */
export type TableFilterChildProps = Omit<
  ReturnType<typeof useTableFilter>,
  "doFilterByFilterList"
>;
