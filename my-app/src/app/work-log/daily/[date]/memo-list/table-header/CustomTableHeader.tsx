"use client";
import CustomHeaderSortCheckLabel from "@/component/table/header/CustomHeaderSortCheckLabel/CustomHeaderSortCheckLabel";
import CustomHeaderSortLabel from "@/component/table/header/CustomHeaderSortLabel/CustomHeaderSortLabel";
import { TableCell, TableHead, TableRow } from "@mui/material";

type Props = {
  /** 昇順かどうか */
  isAsc: boolean;
  /** 項目が選択中かどうか */
  isSelected: (title: string) => boolean;
  /** 表題をクリックした際のハンドラー */
  onClickTitle: (title: string) => void;
  /** セルにホバー時のハンドラー */
  onHoverTitle: (id: number, event: React.MouseEvent<HTMLElement>) => void;
  /** セルにホバー解除時のハンドラー */
  onLeaveHoverTitle: (id: number) => void;
};

/**
 * 日付詳細 - メモリストのテーブルヘッダー
 */
export default function CustomTableHeader({
  isAsc,
  onHoverTitle,
  onLeaveHoverTitle,
  isSelected,
  onClickTitle,
}: Props) {
  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell width="45%">
            <CustomHeaderSortLabel
              title={"タイトル"}
              isSelected={isSelected("タイトル")}
              isAsc={isAsc}
              onClickTitle={onClickTitle}
            />
          </TableCell>
          <TableCell width="30%">
            <CustomHeaderSortCheckLabel
              title={"タスク名"}
              isSelected={isSelected("タスク名")}
              isAsc={isAsc}
              refId={10002}
              onClickTitle={onClickTitle}
              onHoverTitle={onHoverTitle}
              onLeaveTitle={onLeaveHoverTitle}
            />
          </TableCell>
          <TableCell width="15%">タグ</TableCell>
          <TableCell width="10%">{/** ボタン用の空白 */}</TableCell>
        </TableRow>
      </TableHead>
    </>
  );
}
