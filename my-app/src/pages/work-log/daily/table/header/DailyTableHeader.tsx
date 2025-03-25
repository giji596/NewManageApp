import {
  ButtonBase,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { DailyTableHeaderLogic } from "./logic";

type Props = {
  /** 昇順かどうか */
  isAsc: boolean;
  /** 項目が選択中かどうか */
  isSelected: (title: string) => boolean;
  /** 表題をクリックした際のハンドラー */
  OnClickTitle: (title: string) => void;
  /** 表題にホバーした際のハンドラー */
  OnHoverTitle: (title: string) => void;
  /** 表題のホバーを解除した際のハンドラー */
  OnLeaveHoverTitle: (title: string) => void;
};

/** 日ごとの一覧ページのテーブルコンポーネントのヘッダー部分 */
export default function DailyTableHeader({
  isAsc,
  isSelected,
  OnClickTitle,
  OnHoverTitle,
  OnLeaveHoverTitle,
}: Props) {
  const { tableTitles } = DailyTableHeaderLogic();
  return (
    <TableHead>
      <TableRow>
        {tableTitles.map((title) => (
          <TableCell key={title} sx={{ padding: "16px 24px", minWidth: 150 }}>
            <ButtonBase
              onClick={() => OnClickTitle(title)}
              onMouseEnter={() => OnHoverTitle(title)}
              onMouseLeave={() => OnLeaveHoverTitle(title)}
              sx={{
                display: "inline-flex", // ラベルの大きさに合わせる
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "16px", // 楕円っぽい形
                padding: "4px 12px",
                transition: "background-color 0.2s",
                backgroundColor: isSelected(title)
                  ? "rgba(0, 0, 0, 0.07)"
                  : "transparent",
                "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.1)" }, // ホバー時にグレー
                "&:active": { backgroundColor: "rgba(0, 0, 0, 0.2)" }, // クリック時に濃いグレー
              }}
            >
              <TableSortLabel
                active={isSelected(title)}
                direction={isSelected(title) && !isAsc ? "desc" : "asc"}
              >
                {title}
              </TableSortLabel>
            </ButtonBase>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
