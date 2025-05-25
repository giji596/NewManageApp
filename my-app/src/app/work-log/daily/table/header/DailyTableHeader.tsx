"use client";
import { TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { DailyTableHeaderLogic } from "./logic";
import CustomHeaderSortLabel from "@/component/table/header/CustomHeaderSortLabel/CustomHeaderSortLabel";
import CustomHeaderSortCheckLabel from "@/component/table/header/CustomHeaderSortCheckLabel/CustomHeaderSortCheckLabel";
import CustomMenuCheckBox from "@/component/menu/content/CustomMenuCheckBox/CustomMenuCheckBox";
import CustomMenuWrapper from "@/component/menu/CustomMenuWrapper/CustomMenuWrapper";
import CustomMenuWrapperLogic from "@/component/menu/CustomMenuWrapper/CustomMenuWrapperLogic";
import { TableFilterChildProps } from "@/type/Table";

type Props = {
  /** 昇順かどうか */
  isAsc: boolean;
  /** 項目が選択中かどうか */
  isSelected: (title: string) => boolean;
  /** タスクのフィルターロジック */
  taskFilterLogic: TableFilterChildProps;
  /** カテゴリのフィルターロジック */
  categoryFilterLogic: TableFilterChildProps;
  /** 表題をクリックした際のハンドラー */
  OnClickTitle: (title: string) => void;
};

/** 日ごとの一覧ページのテーブルコンポーネントのヘッダー部分 */
export default function DailyTableHeader({
  isAsc,
  isSelected,
  taskFilterLogic,
  categoryFilterLogic,
  OnClickTitle,
}: Props) {
  const { headerColumnDisplay, getPopperIdRef } = DailyTableHeaderLogic();
  const { openTargetIdRef, handleMouseEnter, handleMouseLeave, ...prev } =
    CustomMenuWrapperLogic();
  const {
    filterList: taskFilterList,
    toggleFilterCheckBox: toggleTaskFilterCheckBox,
  } = taskFilterLogic;
  const {
    filterList: categoryFilterList,
    toggleFilterCheckBox: toggleCategoryFilterCheckBox,
  } = categoryFilterLogic;
  return (
    <>
      <TableHead>
        <TableRow>
          {Object.entries(headerColumnDisplay).map(([title, type]) => (
            // 共通設定(パディングやサイズなど)
            <TableCell key={title}>
              {/** メニューを表示しない場合(日付・合計稼働時間) */}
              {type == "none" && (
                <CustomHeaderSortLabel
                  title={title}
                  isSelected={isSelected(title)}
                  isAsc={isAsc}
                  onClickTitle={OnClickTitle}
                />
              )}
              {/** チェックボックスメニューを表示する場合(カテゴリ・タスク) */}
              {type == "checkbox" && (
                <CustomHeaderSortCheckLabel
                  title={title}
                  isSelected={isSelected(title)}
                  isAsc={isAsc}
                  refId={getPopperIdRef(title)}
                  onClickTitle={OnClickTitle}
                  onHoverTitle={handleMouseEnter}
                  onLeaveTitle={handleMouseLeave}
                />
              )}
              {/** メニュー表示もソートもできない(メモ) */}
              {type == "title" && <Typography>{title}</Typography>}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      {/** カスタムメニューの面々   */}
      <CustomMenuWrapper
        logic={{ handleMouseEnter, handleMouseLeave, openTargetIdRef, ...prev }}
      >
        {/** カテゴリメニューの場合 */}
        {openTargetIdRef.current === 10000 && (
          <CustomMenuCheckBox
            checkList={categoryFilterList}
            onClickSelect={toggleCategoryFilterCheckBox}
          />
        )}
        {/** タスクメニューの場合 */}
        {openTargetIdRef.current === 10001 && (
          <CustomMenuCheckBox
            checkList={taskFilterList}
            onClickSelect={toggleTaskFilterCheckBox}
          />
        )}
      </CustomMenuWrapper>
    </>
  );
}
