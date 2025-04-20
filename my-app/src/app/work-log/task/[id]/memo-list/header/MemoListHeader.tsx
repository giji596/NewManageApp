"use client";
import CustomMenuCheckBox from "@/component/menu/content/CustomMenuCheckBox/CustomMenuCheckBox";
import CustomMenuWrapper from "@/component/menu/CustomMenuWrapper/CustomMenuWrapper";
import CustomMenuWrapperLogic from "@/component/menu/CustomMenuWrapper/CustomMenuWrapperLogic";
import CustomHeaderSortCheckLabel from "@/component/table/header/CustomHeaderSortCheckLabel/CustomHeaderSortCheckLabel";
import CustomHeaderSortLabel from "@/component/table/header/CustomHeaderSortLabel/CustomHeaderSortLabel";
import { TableCell, TableRow } from "@mui/material";

type Props = {
  /** 昇順かどうか */
  isAsc: boolean;
  /** タグのチェック一覧(key:タグ名 value:チェック状況) */
  tagCheckList: Record<string, boolean>;
  /** 項目が選択中かどうか */
  isSelected: (title: string) => boolean;
  /** 表題をクリックした際のハンドラー */
  onClickTitle: (title: string) => void;
  /** タグのチェックボックスをクリックした際のハンドラー */
  onClickSelectTag: (item: string) => void;
};

/**
 * メモ一覧のヘッダー部分
 */
export default function MemoListHeader({
  isAsc,
  tagCheckList,
  isSelected,
  onClickTitle,
  onClickSelectTag,
}: Props) {
  const { openTargetIdRef, handleMouseEnter, handleMouseLeave, ...prev } =
    CustomMenuWrapperLogic();
  return (
    <>
      <TableRow>
        {/** 日付 */}
        <TableCell width="30%">
          <CustomHeaderSortLabel
            title="日付"
            isSelected={isSelected("日付")}
            isAsc={isAsc}
            onClickTitle={onClickTitle}
          />
        </TableCell>
        {/** タイトル */}
        <TableCell width="40%">
          <CustomHeaderSortLabel
            title="タイトル"
            isSelected={isSelected("タイトル")}
            isAsc={isAsc}
            onClickTitle={onClickTitle}
          />
        </TableCell>
        {/** タグ */}
        <TableCell width="20%">
          <CustomHeaderSortCheckLabel
            title="タグ"
            isSelected={isSelected("タグ")}
            isAsc={isAsc}
            onClickTitle={onClickTitle}
            refId={10003}
            onHoverTitle={handleMouseEnter}
            onLeaveTitle={handleMouseLeave}
          />
        </TableCell>
        {/** (編集ボタン用のからの列) */}
        <TableCell width="10%"></TableCell>
      </TableRow>
      {/** タグ用のメニュー */}
      {openTargetIdRef.current === 10003 && (
        <CustomMenuWrapper
          logic={{
            openTargetIdRef,
            handleMouseEnter,
            handleMouseLeave,
            ...prev,
          }}
        >
          <CustomMenuCheckBox
            checkList={tagCheckList}
            onClickSelect={onClickSelectTag}
          />
        </CustomMenuWrapper>
      )}
    </>
  );
}
