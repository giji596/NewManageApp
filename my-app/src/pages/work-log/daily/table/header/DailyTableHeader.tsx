import { TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { DailyTableHeaderLogic } from "./logic";
import CustomHeaderSortLabel from "@/component/table/header/CustomHeaderSortLabel/CustomHeaderSortLabel";
import CustomHeaderSortCheckLabel from "@/component/table/header/CustomHeaderSortCheckLabel/CustomHeaderSortCheckLabel";

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
  const { headerColumnDisplay, getPopperIdRef } = DailyTableHeaderLogic();
  return (
    <TableHead>
      <TableRow>
        {Object.entries(headerColumnDisplay).map(([title, type]) => (
          // 共通設定(パディングやサイズなど)
          <TableCell key={title}>
            {/** メニューを表示しない場合(日付・合計稼働時間) */}
            {type == "none" && (
              <CustomHeaderSortLabel
                title={title}
                isSelected={isSelected(title)}
                isAsc={isAsc}
                onClickTitle={OnClickTitle}
              />
            )}
            {/** チェックボックスメニューを表示する場合(カテゴリ・タスク) */}
            {type == "checkbox" && (
              <CustomHeaderSortCheckLabel
                title={title}
                isSelected={isSelected(title)}
                isAsc={isAsc}
                refId={getPopperIdRef(title)}
                onClickTitle={OnClickTitle}
                onHoverTitle={onHoverTitle}
                onLeaveTitle={onLeaveHoverTitle}
              />
            )}
            {/** メニュー表示もソートもできない(メモ) */}
            {type == "title" && <Typography>{title}</Typography>}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
