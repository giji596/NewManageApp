import { useDateSelect } from "@/hook/useDateSelect";
import { getDate, getMonth, getYear } from "date-fns";
import { useCallback, useMemo } from "react";

type Props = {
  /** ダイアログ閉じる関数 */
  onClose: () => void;
  /** 開始期間の初期値 */
  initialStartDate: Date;
  /** 終了期間の初期値 */
  initialEndDate: Date;
  /** 選択した範囲のデータを取得する関数 */
  getDataSelectRange: (start: Date, end: Date) => void;
};

/**
 * 表示期間を選択するダイアログのロジック
 */
export default function PeriodSelectDialogLogic({
  onClose,
  initialStartDate,
  initialEndDate,
  getDataSelectRange,
}: Props) {
  // 開始期間
  const initStartYear = useMemo(
    () => getYear(initialStartDate),
    [initialStartDate]
  );
  const initStartMonth = useMemo(
    () => getMonth(initialStartDate) + 1,
    [initialStartDate]
  );
  const initStartDay = useMemo(
    () => getDate(initialStartDate),
    [initialStartDate]
  );
  const { dateParam: startDateParam, ...startDateLogic } = useDateSelect({
    initYear: initStartYear,
    initMonth: initStartMonth,
    initDay: initStartDay,
  });

  // 終了期間
  const initEndYear = useMemo(() => getYear(initialEndDate), [initialEndDate]);
  const initEndMonth = useMemo(
    () => getMonth(initialEndDate) + 1,
    [initialEndDate]
  );
  const initEndDay = useMemo(() => getDate(initialEndDate), [initialEndDate]);
  const { dateParam: endDateParam, ...endDateLogic } = useDateSelect({
    initYear: initEndYear,
    initMonth: initEndMonth,
    initDay: initEndDay,
  });

  const onClickSelect = useCallback(
    // 依存値から外すために引数に(startDateとendDateは受け渡し時に)
    async (start: Date, end: Date) => {
      await getDataSelectRange(start, end);
      console.log("送信！", start, end); // FIXME:親のできるまでのチェック用
      onClose();
    },
    [getDataSelectRange, onClose]
  );

  const isValid = startDateParam <= endDateParam; // ここダイアログ操作中はどっちかは変化し続けるのでメモ化しない
  return {
    /** 開始の日付選択のロジック */
    startDateLogic,
    /** 終了の日付選択のロジック */
    endDateLogic,
    /** 「選択」ボタンを押した際のハンドラー */
    onClickSelect: () =>
      onClickSelect(new Date(startDateParam), new Date(endDateParam)),
    /** ばりでーしょん(終了>開始になっているか？) */
    isValid,
  };
}
