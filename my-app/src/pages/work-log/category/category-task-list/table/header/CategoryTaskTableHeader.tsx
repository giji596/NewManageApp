import CustomHeaderSortLabel from "@/component/table/header/CustomHeaderSortLabel/CustomHeaderSortLabel";
import { TableCell, TableRow } from "@mui/material";
import { memo } from "react";

/**
 * カテゴリページのタスク一覧のテーブルヘッダー
 */
const CategoryTaskTableHeader = memo(function CategoryTaskTableHeader() {
  return (
    <TableRow>
      {/** お気に入り */}
      <TableCell sx={{ width: "10%" }}>お気に入り</TableCell>
      {/** タスク名 */}
      <TableCell sx={{ width: "60%" }}>
        <CustomHeaderSortLabel
          title={"タスク名"}
          isSelected={false}
          isAsc={false}
          onClickTitle={() => {}}
        />
      </TableCell>
      {/** 進捗 */}
      <TableCell sx={{ width: "20%" }}>
        <CustomHeaderSortLabel
          title={"進捗"}
          isSelected={false}
          isAsc={false}
          onClickTitle={() => {}}
        />
      </TableCell>
      {/** (移動ボタン用の空枠) */}
      <TableCell sx={{ width: "10%" }}></TableCell>
    </TableRow>
  );
});
export default CategoryTaskTableHeader;
