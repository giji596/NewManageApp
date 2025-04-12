import CustomMenuCheckBox from "@/component/menu/content/CustomMenuCheckBox/CustomMenuCheckBox";
import CustomMenuWrapper from "@/component/menu/CustomMenuWrapper/CustomMenuWrapper";
import CustomMenuWrapperLogic from "@/component/menu/CustomMenuWrapper/CustomMenuWrapperLogic";
import CustomHeaderSortCheckLabel from "@/component/table/header/CustomHeaderSortCheckLabel/CustomHeaderSortCheckLabel";
import CustomHeaderSortLabel from "@/component/table/header/CustomHeaderSortLabel/CustomHeaderSortLabel";
import HeaderFavoriteLabel from "@/component/table/header/HeaderFavoriteLabel/HeaderFavoriteLabel";
import { TableCell, TableRow } from "@mui/material";

type Props = {
  /** おきにのチェック状態 */
  isFavoriteChecked: boolean;
  /** 昇順かどうか */
  isAsc: boolean;
  /** タスクのチェック一覧(key:タスク名 value:チェック状況) */
  taskCheckList: Record<string, boolean>;
  /** カテゴリのチェック一覧(key:カテゴリ名 value:チェック状況) */
  categoryCheckList: Record<string, boolean>;
  /** おきにのチェックを押した時のハンドラー */
  onClickFavorite: () => void;
  /** 項目が選択中かどうか */
  isSelected: (title: string) => boolean;
  /** 表題をクリックした際のハンドラー */
  onClickTitle: (title: string) => void;
  /** タスクのチェックボックスをクリックした際のハンドラー */
  onClickSelectTask: (item: string) => void;
  /** カテゴリのチェックボックスをクリックした際のハンドラー */
  onClickSelectCategory: (item: string) => void;
};

/**
 * タスク一覧ページのテーブルヘッダー
 */
export default function TaskSummaryTableHeader({
  isFavoriteChecked,
  isAsc,
  taskCheckList,
  categoryCheckList,
  onClickFavorite,
  isSelected,
  onClickTitle,
  onClickSelectTask,
  onClickSelectCategory,
}: Props) {
  const { openTargetIdRef, handleMouseEnter, handleMouseLeave, ...prev } =
    CustomMenuWrapperLogic();
  return (
    <>
      <TableRow>
        {/** おきに */}
        <TableCell width={"5%"}>
          <HeaderFavoriteLabel
            isChecked={isFavoriteChecked}
            onClick={onClickFavorite}
          />
        </TableCell>
        {/** タスク名 */}
        <TableCell width={"27.5%"}>
          <CustomHeaderSortCheckLabel
            title={"タスク名"}
            isSelected={isSelected("タスク名")}
            isAsc={isAsc}
            refId={10001}
            onClickTitle={onClickTitle}
            onHoverTitle={handleMouseEnter}
            onLeaveTitle={handleMouseLeave}
          />
        </TableCell>
        {/** カテゴリ名 */}
        <TableCell width={"20%"}>
          <CustomHeaderSortCheckLabel
            title={"カテゴリ名"}
            isSelected={isSelected("カテゴリ名")}
            isAsc={isAsc}
            refId={10002}
            onClickTitle={onClickTitle}
            onHoverTitle={handleMouseEnter}
            onLeaveTitle={handleMouseLeave}
          />
        </TableCell>
        {/** 進捗*/}
        <TableCell width={"10%"}>
          <CustomHeaderSortLabel
            title={"進捗"}
            isSelected={isSelected("進捗")}
            isAsc={isAsc}
            onClickTitle={onClickTitle}
          />
        </TableCell>
        {/** 稼働合計 */}
        <TableCell width={"12.5%"}>
          <CustomHeaderSortLabel
            title={"稼働合計"}
            isSelected={isSelected("稼働合計")}
            isAsc={isAsc}
            onClickTitle={onClickTitle}
          />
        </TableCell>
        {/** 開始日 */}
        <TableCell width={"12.5%"}>
          <CustomHeaderSortLabel
            title={"稼働開始日"}
            isSelected={isSelected("稼働開始日")}
            isAsc={isAsc}
            onClickTitle={onClickTitle}
          />
        </TableCell>
        {/** 最終稼働日 */}
        <TableCell width={"12.5%"}>
          <CustomHeaderSortLabel
            title={"最終稼働日"}
            isSelected={isSelected("最終稼働日")}
            isAsc={isAsc}
            onClickTitle={onClickTitle}
          />
        </TableCell>
      </TableRow>
      {/** タスク用のメニュー */}
      {openTargetIdRef.current === 10001 && (
        <CustomMenuWrapper
          logic={{
            openTargetIdRef,
            handleMouseEnter,
            handleMouseLeave,
            ...prev,
          }}
        >
          <CustomMenuCheckBox
            checkList={taskCheckList}
            onClickSelect={onClickSelectTask}
          />
        </CustomMenuWrapper>
      )}
      {/** カテゴリ用のメニュー */}
      {openTargetIdRef.current === 10002 && (
        <CustomMenuWrapper
          logic={{
            openTargetIdRef,
            handleMouseEnter,
            handleMouseLeave,
            ...prev,
          }}
        >
          <CustomMenuCheckBox
            checkList={categoryCheckList}
            onClickSelect={onClickSelectCategory}
          />
        </CustomMenuWrapper>
      )}
    </>
  );
}
