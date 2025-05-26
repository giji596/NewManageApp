"use client";
import { Table, TableBody, TableContainer } from "@mui/material";
import CustomTableHeader from "./table-header/CustomTableHeader";
import CustomTableBody from "./table-body/CustomTableBody";
import TableBodyLoading from "@/component/table/body/TableBodyLoading/TableBodyLoading";
import TableBodyNoItem from "@/component/table/body/TableBodyNoItem/TableBodyNoItem";
import CustomMenuWrapper from "@/component/menu/CustomMenuWrapper/CustomMenuWrapper";
import CustomMenuCheckBox from "@/component/menu/content/CustomMenuCheckBox/CustomMenuCheckBox";
import CustomMenuWrapperLogic from "@/component/menu/CustomMenuWrapper/CustomMenuWrapperLogic";
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
  const { handleMouseEnter, handleMouseLeave, openTargetIdRef, ...prev } =
    CustomMenuWrapperLogic();
  const {
    memoItemList,
    isLoading,
    isActiveRow,
    handleClickRow,
    isAsc,
    isSelected,
    handleClickSortLabel,
    doSort,
    taskFilterList,
    toggleTaskFilterCheckBox,
    tagFilterList,
    toggleTagFilterCheckBox,
    doFilterByFilterList,
    isSelectedTaskRow,
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
    <>
      <TableContainer sx={{ height: 345 }}>
        <CustomTable<MemoDailyTask>
          data={memoItemList}
          columns={columnsConfig}
        />
        <Table sx={{ tableLayout: "fixed " }}>
          <CustomTableHeader
            isAsc={isAsc}
            isSelected={isSelected}
            onClickTitle={handleClickSortLabel}
            onHoverTitle={handleMouseEnter}
            onLeaveHoverTitle={handleMouseLeave}
          />
          <TableBody>
            {isLoading && <TableBodyLoading colCount={4} />}
            {!isLoading && memoItemList.length === 0 && (
              <TableBodyNoItem colCount={4} />
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
                    isHighlighted={isSelectedTaskRow(item.task.id)}
                    onClickRow={handleClickRow}
                  />
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CustomMenuWrapper
        logic={{ handleMouseEnter, handleMouseLeave, openTargetIdRef, ...prev }}
      >
        {/** タスク名にホバー時に表示するメニュー(フィルター関連) */}
        {openTargetIdRef.current === 10002 && (
          <CustomMenuCheckBox
            checkList={taskFilterList}
            onClickSelect={toggleTaskFilterCheckBox}
          />
        )}
        {/** タグ名にホバー時に表示するメニュー(フィルター関連) */}
        {openTargetIdRef.current === 10003 && (
          <CustomMenuCheckBox
            checkList={tagFilterList}
            onClickSelect={toggleTagFilterCheckBox}
          />
        )}
      </CustomMenuWrapper>
    </>
  );
}
