"use client";
import { DailyDetailTaskTableType } from "@/type/Task";
import CustomTable, {
  ColumnConfig,
} from "@/component/table/CustomTable/CustomTable";
import { useMemo } from "react";
import { TableContainer } from "@mui/material";

type Props = {
  /** タスク一覧 */
  taskList: DailyDetailTaskTableType[];
  /** ロード状態か */
  isLoading: boolean;
  /** rowをクリックした際のハンドラー */
  onClickRow: (id: number) => void;
  /** 選択状態のアイテムid */
  selectedItemId: number | null;
};

/**
 * 日付詳細ページのタスクテーブルのコンポーネント
 */
export default function TaskTable({
  taskList,
  isLoading,
  onClickRow,
  selectedItemId,
}: Props) {
  const columnsConfig: ColumnConfig<DailyDetailTaskTableType>[] = useMemo(
    () => [
      {
        key: "task.name",
        title: "タスク",
        labelProp: "sortableAndFilterable",
      },
      {
        key: "category.name",
        title: "カテゴリ",
        labelProp: "sortableAndFilterable",
      },
      {
        key: "dailyHours",
        title: "稼働時間",
        labelProp: "sortable",
      },
    ],
    []
  );
  return (
    <TableContainer sx={{ height: 345 }}>
      <CustomTable<DailyDetailTaskTableType>
        data={taskList}
        columns={columnsConfig}
        loading={isLoading}
        onClickRow={onClickRow}
        selectedId={selectedItemId}
        stickyHeader
      />
    </TableContainer>
  );
}
