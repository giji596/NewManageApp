"use client";
import { Table, TableBody, TableContainer, TableHead } from "@mui/material";
import MemoListHeader from "./header/MemoListHeader";
import { MemoTaskDetail } from "@/type/Memo";
import MemoListRow from "./row/MemoListRow";
import MemoListLogic from "./MemoListLogic";
import TableBodyNoItem from "@/component/table/body/TableBodyNoItem/TableBodyNoItem";

type Props = {
  /** メモアイテムリスト */
  memoItemList: MemoTaskDetail[];
};

/**
 * タスク詳細　メモリストのコンポーネント
 */
export default function MemoList({ memoItemList }: Props) {
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
  return (
    <TableContainer>
      <Table sx={{ tableLayout: "fixed" }} stickyHeader>
        <TableHead>
          <MemoListHeader
            isAsc={isAsc}
            tagCheckList={filterList}
            isSelected={isSelected}
            onClickTitle={handleClickSortLabel}
            onClickSelectTag={toggleFilterCheckBox}
          />
        </TableHead>
        <TableBody>
          {memoItemList.length === 0 && <TableBodyNoItem colCount={4} />}
          {memoItemList.length !== 0 &&
            memoItemList
              .filter(doFilterByFilterList)
              .sort(doSort)
              .map((item) => (
                <MemoListRow
                  key={item.id}
                  memoItem={item}
                  isActive={activeRowId === item.id}
                  onClickRow={handleClickRow}
                />
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
