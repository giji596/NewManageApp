import useTableSort from "@/hook/useTableSort";

/**
 * カテゴリページのタスク一覧のテーブルのロジック
 */
export default function CategoryTaskTableLogic() {
  const { target, isAsc, isSelected, handleClickSortLabel, doSort } =
    useTableSort({ initialTarget: "progress" });
}
