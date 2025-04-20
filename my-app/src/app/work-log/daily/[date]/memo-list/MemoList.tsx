"use client";
import { Table, TableBody, TableContainer } from "@mui/material";
import CustomTableHeader from "./table-header/CustomTableHeader";
import { MemoDailyTask } from "@/type/Memo";
import CustomTableBody from "./table-body/CustomTableBody";
import TableBodyLoading from "@/component/table/body/TableBodyLoading/TableBodyLoading";
import TableBodyNoItem from "@/component/table/body/TableBodyNoItem/TableBodyNoItem";
import CustomMenuWrapper from "@/component/menu/CustomMenuWrapper/CustomMenuWrapper";
import CustomMenuCheckBox from "@/component/menu/content/CustomMenuCheckBox/CustomMenuCheckBox";
import CustomMenuWrapperLogic from "@/component/menu/CustomMenuWrapper/CustomMenuWrapperLogic";
import MemoListLogic from "./MemoListLogic";

type Props = {
  /** メモのアイテム一覧 */
  memoItemList: MemoDailyTask[];
  /** ローディング状態 */
  isLoading: boolean;
};

export default function MemoList({ memoItemList, isLoading }: Props) {
  const { handleMouseEnter, handleMouseLeave, ...prev } =
    CustomMenuWrapperLogic();
  const {
    isActiveRow,
    handleClickRow,
    isAsc,
    isSelected,
    handleClickSortLabel,
    doSort,
    taskFilterList,
    toggleTaskFilterCheckBox,
    doFilterByFilterList,
  } = MemoListLogic({ memoItemList });
  return (
    <>
      <TableContainer>
        <Table sx={{ tableLayout: "fixed " }}>
          <CustomTableHeader
            isAsc={isAsc}
            isSelected={isSelected}
            onClickTitle={handleClickSortLabel}
            onHoverTitle={handleMouseEnter}
            onLeaveHoverTitle={handleMouseLeave}
          />
          <TableBody>
            {isLoading && <TableBodyLoading colCount={2} />}
            {!isLoading && memoItemList.length === 0 && (
              <TableBodyNoItem colCount={2} />
            )}
            {!isLoading &&
              memoItemList.length !== 0 &&
              memoItemList
                .sort(doSort)
                .filter(doFilterByFilterList)
                .map((item) => (
                  <CustomTableBody
                    key={item.id}
                    memoItem={item}
                    isActive={isActiveRow(item.id)}
                    onClickRow={handleClickRow}
                  />
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/** タスク名にホバー時に表示するメニュー(フィルター関連) */}
      <CustomMenuWrapper
        logic={{ handleMouseEnter, handleMouseLeave, ...prev }}
      >
        <CustomMenuCheckBox
          checkList={taskFilterList}
          onClickSelect={toggleTaskFilterCheckBox}
        />
      </CustomMenuWrapper>
    </>
  );
}
