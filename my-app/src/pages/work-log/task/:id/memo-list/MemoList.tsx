import { Table, TableBody, TableContainer, TableHead } from "@mui/material";
import MemoListHeader from "./header/MemoListHeader";
import { MemoTaskDetail } from "@/type/Memo";
import MemoListRow from "./row/MemoListRow";
import MemoListLogic from "./MemoListLogic";

type Props = {
  /** メモアイテムリスト */
  memoItemList: MemoTaskDetail[];
};

/**
 * タスク詳細　メモリストのコンポーネント
 */
export default function MemoList({ memoItemList }: Props) {
  const {
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
      <Table sx={{ tableLayout: "fixed" }}>
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
          {memoItemList
            .filter(doFilterByFilterList)
            .sort(doSort)
            .map((item) => (
              <MemoListRow
                key={item.id}
                memoItem={item}
                isActive={false}
                onClickRow={() => {}}
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
