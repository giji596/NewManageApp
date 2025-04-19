import { TableHead, TableRow, TableCell } from "@mui/material";
import TaskTableHeaderLogic from "./TaskTableHeaderLogic";
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

/**
 * 日付ページ詳細のタスク部分のテーブルのヘッダーコンポーネント
 */
export default function TaskTableHeader({
  isAsc,
  onHoverTitle,
  onLeaveHoverTitle,
  isSelected,
  OnClickTitle,
}: Props) {
  const { headerColumnDisplay, getPopperIdRef, getWidth } =
    TaskTableHeaderLogic();
  return (
    <TableHead>
      <TableRow>
        {Object.entries(headerColumnDisplay).map(([title, type]) => (
          // 共通設定(パディングやサイズなど)
          <TableCell key={title} width={getWidth(title)}>
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
            {/** メニューを表示しない場合(合計稼働時間) */}
            {type == "none" && (
              <CustomHeaderSortLabel
                title={title}
                isSelected={isSelected(title)}
                isAsc={isAsc}
                onClickTitle={OnClickTitle}
              />
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
