"use client";
import { IconButton, TableContainer } from "@mui/material";
import { MemoTaskDetail } from "@/type/Memo";
import MemoListLogic from "./MemoListLogic";
import CustomTable, {
  ColumnConfig,
} from "@/component/table/CustomTable/CustomTable";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import MemoEditDialog from "@/component/dialog/memo-edit-dialog/MemoEditDialog";
import useDialog from "@/hook/useDialog";
import { format } from "date-fns";

type Props = {
  /** メモアイテムリスト */
  memoItemList: MemoTaskDetail[];
};

/**
 * タスク詳細　メモリストのコンポーネント
 */
export default function MemoList({ memoItemList }: Props) {
  const { open, onClose, onOpen } = useDialog();
  const {
    activeRowId,
    handleClickRow,
    isAsc,
    isSelected,
    handleClickSortLabel,
    doSort,
    filterList,
    toggleFilterCheckBox,
    doFilterByFilterList,
  } = MemoListLogic({
    memoItemList,
  });
  const columnConfig: ColumnConfig<MemoTaskDetail>[] = [
    {
      key: "date",
      title: "日付",
      width: "30%",
      labelProp: "sortable",
      renderCell: (row) => <>{format(row.date, "yyyy/MM/dd")}</>,
    },
    { key: "title", title: "タイトル", width: "40%", labelProp: "sortable" },
    {
      key: "tag",
      title: "タグ",
      width: "20%",
      labelProp: "sortableAndFilterable",
    },
    {
      key: "id",
      title: "",
      width: "10%",
      renderCell: () => (
        <IconButton
          onClick={(e) => {
            e.stopPropagation(); // rowのイベント(文章の頭を展開する)を行わせない
            onOpen();
          }}
        >
          <AspectRatioIcon />
        </IconButton>
      ),
    },
  ];
  return (
    <>
      <TableContainer>
        <CustomTable<MemoTaskDetail>
          data={memoItemList}
          columns={columnConfig}
          onClickRow={handleClickRow}
          stickyHeader
        />
      </TableContainer>
      {open && (
        <MemoEditDialog
          id={0} // TODO:
          title={""} // TODO:
          tagName={"memoItem.tag"} //TODO
          open={open}
          onClose={onClose}
        />
      )}
    </>
  );
}
