import { useCallback } from "react";

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
    /** セレクトの一覧 */
    selectList,
    /** セレクトの名称からvalueを取得する関数 */
    getSelectValue,
  };
};
