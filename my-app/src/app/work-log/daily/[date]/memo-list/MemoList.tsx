"use client";
import { TableContainer } from "@mui/material";
import MemoListLogic from "./MemoListLogic";
import CustomTable, {
  ColumnConfig,
} from "@/component/table/CustomTable/CustomTable";
import { MemoDailyTask } from "@/type/Memo";

type Props = {
  /** 選択中のタスクのid(ハイライトように) */
  selectedItemTaskId: number;
};

export default function MemoList({ selectedItemTaskId }: Props) {
  const {
    memoItemList,
    isLoading,
    selectedRowId,
    handleClickRow,
    backgroundColor,
  } = MemoListLogic({ selectedItemTaskId });

  const columnsConfig: ColumnConfig<MemoDailyTask>[] = [
    { key: "title", title: "タイトル", width: "45%", labelProp: "sortable" },
    {
      key: "task.name",
      title: "タスク名",
      width: "30%",
      labelProp: "sortableAndFilterable",
    },
    {
      key: "tagName",
      title: "タグ",
      width: "15%",
      labelProp: "sortableAndFilterable",
    },
    { key: "id", title: "", width: "10%", renderCell: () => <></> },
  ];
  return (
    <TableContainer sx={{ height: 345 }}>
      <CustomTable<MemoDailyTask>
        data={memoItemList}
        columns={columnsConfig}
        loading={isLoading}
        collapsibleItemKey={"summary"}
        onClickRow={handleClickRow}
        selectedId={selectedRowId}
        rowColor={backgroundColor}
      />
    </TableContainer>
  );
}
