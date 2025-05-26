"use client";
import { IconButton, TableContainer } from "@mui/material";
import MemoListLogic from "./MemoListLogic";
import CustomTable, {
  ColumnConfig,
} from "@/component/table/CustomTable/CustomTable";
import { MemoDailyTask } from "@/type/Memo";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import MemoEditDialog from "@/component/dialog/memo-edit-dialog/MemoEditDialog";
import useDialog from "@/hook/useDialog";

type Props = {
  /** 選択中のタスクのid(ハイライトように) */
  selectedItemTaskId: number;
};

export default function MemoList({ selectedItemTaskId }: Props) {
  const { open, onClose, onOpen } = useDialog();
  const {
    memoItemList,
    isLoading,
    selectedRowId,
    handleClickRow,
    backgroundColor,
    editTarget,
    onClickEditButton,
  } = MemoListLogic({ selectedItemTaskId, onOpen });
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
    {
      key: "id",
      title: "",
      width: "10%",

      renderCell: (row) => (
        <IconButton
          onClick={(e) => {
            e.stopPropagation(); // rowのイベント(文章の頭を展開する)を行わせない
            onClickEditButton(row);
          }}
        >
          <AspectRatioIcon />
        </IconButton>
      ),
    },
  ];
  return (
    <>
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
      {open && editTarget.current && (
        <MemoEditDialog
          id={editTarget.current.id}
          title={editTarget.current.title}
          tagName={editTarget.current.tagName}
          open={open}
          onClose={onClose}
        />
      )}
    </>
  );
}
