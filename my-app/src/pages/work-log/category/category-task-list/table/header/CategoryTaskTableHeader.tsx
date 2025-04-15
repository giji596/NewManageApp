import CustomHeaderSortLabel from "@/component/table/header/CustomHeaderSortLabel/CustomHeaderSortLabel";
import { TableCell, TableRow } from "@mui/material";
import { memo } from "react";
import HeaderFavoriteLabel from "@/component/table/header/HeaderFavoriteLabel/HeaderFavoriteLabel";

type Props = {
  /** ソート対象かどうか */
  isSortTarget: (title: string) => boolean;
  /** ソートが昇順/降順どっちか */
  isAsc: boolean;
  /** ソート対象をクリックした際のハンドラー */
  onClickSortLabel: (title: string) => void;
};

/**
 * カテゴリページのタスク一覧のテーブルヘッダー
 */
const CategoryTaskTableHeader = memo(function CategoryTaskTableHeader({
  isSortTarget,
  isAsc,
  onClickSortLabel,
}: Props) {
  return (
    <TableRow>
      {/** お気に入り */}
      <TableCell sx={{ width: "10%" }}>
        <HeaderFavoriteLabel isChecked={false} onClick={() => {}} />
      </TableCell>
      {/** タスク名 */}
      <TableCell sx={{ width: "60%" }}>
        <CustomHeaderSortLabel
          title={"タスク名"}
          isSelected={isSortTarget("タスク名")}
          isAsc={isAsc}
          onClickTitle={onClickSortLabel}
        />
      </TableCell>
      {/** 進捗 */}
      <TableCell sx={{ width: "20%" }}>
        <CustomHeaderSortLabel
          title={"進捗"}
          isSelected={isSortTarget("進捗")}
          isAsc={isAsc}
          onClickTitle={onClickSortLabel}
        />
      </TableCell>
      {/** (移動ボタン用の空枠) */}
      <TableCell sx={{ width: "10%" }}></TableCell>
    </TableRow>
  );
});
export default CategoryTaskTableHeader;
