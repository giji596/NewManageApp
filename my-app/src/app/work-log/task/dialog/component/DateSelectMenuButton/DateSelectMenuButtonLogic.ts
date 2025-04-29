import { useCallback, useState } from "react";

type Props = {
  /** 選択中の年 */
  selectYear: number;
  /** 選択中の月 */
  selectMonth: number;
  /** 選択中の日 */
  selectDay: number;
};

/**
 * 日付選択のメニュー及びそれを開閉するボタンのコンポーネントのロジック
 */
export const DateSelectMenuButtonLogic = ({
  selectYear,
  selectMonth,
  selectDay,
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const selectList = ["year", "month", "day"] as const;
  const getSelectValue = useCallback(
    (v: (typeof selectList)[number]) => {
      switch (v) {
        case "year":
          return selectYear;
        case "month":
          return selectMonth;
        case "day":
          return selectDay;
      }
    },
    [selectDay, selectMonth, selectYear]
  );
  return {
    /** メニューの開閉状態 */
    open,
    /** メニューの開閉位置 */
    anchorEl,
    /** ボタンクリックした際のハンドラー(メニュー開く) */
    handleClick,
    /** メニュー閉じるハンドラー */
    handleClose,
    /** セレクトの一覧 */
    selectList,
    /** セレクトの名称からvalueを取得する関数 */
    getSelectValue,
  };
};
