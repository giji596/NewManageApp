import {
  ButtonBase,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { DailyTableHeaderLogic } from "./logic";

type Props = {
  /** 昇順かどうか */
  isAsc: boolean;
  /** 項目が選択中かどうか */
  isSelected: (title: string) => boolean;
  /** 表題をクリックした際のハンドラー */
  OnClickTitle: (title: string) => void;
  /** セルにホバー時のハンドラー */
  onHoverTitle: (id: number, event: React.MouseEvent<HTMLElement>) => void;
  /** セルにホバー解除時のハンドラー */
  onLeaveHoverTitle: (id: number) => void;
};

/** 日ごとの一覧ページのテーブルコンポーネントのヘッダー部分 */
export default function DailyTableHeader({
  isAsc,
  onHoverTitle,
  onLeaveHoverTitle,
  isSelected,
  OnClickTitle,
}: Props) {
  const { headerColumnDisplay, getButtonDesign, getPopperIdRef } =
    DailyTableHeaderLogic({
      isSelected,
    });
  return (
    <TableHead>
      <TableRow>
        {Object.entries(headerColumnDisplay).map(([title, type]) => (
          // 共通設定(パディングやサイズなど)
          <TableCell key={title}>
            {/** メニューを表示しない場合(日付・合計稼働時間) */}
            {type == "none" && (
              <ButtonBase
                onClick={() => OnClickTitle(title)}
                sx={getButtonDesign(title)}
              >
                <TableSortLabel
                  active={isSelected(title)}
                  direction={isSelected(title) && !isAsc ? "desc" : "asc"}
                >
                  {title}
                </TableSortLabel>
              </ButtonBase>
            )}

            {/** チェックボックスメニューを表示する場合(カテゴリ・タスク) */}
            {type == "checkbox" && (
              <ButtonBase
                onClick={() => OnClickTitle(title)}
                onMouseEnter={(event) =>
                  onHoverTitle(getPopperIdRef(title), event)
                }
                onMouseLeave={() => onLeaveHoverTitle(getPopperIdRef(title))}
                sx={getButtonDesign(title)}
              >
                <TableSortLabel
                  active={isSelected(title)}
                  direction={isSelected(title) && !isAsc ? "desc" : "asc"}
                >
                  {title}
                </TableSortLabel>
              </ButtonBase>
            )}
            {/** メニュー表示もソートもできない(メモ) */}
            {type == "title" && <Typography>{title}</Typography>}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
