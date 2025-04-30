import { useCallback, useMemo, useState } from "react";
import { useDateSelectMenuButton } from "./component/DateSelectMenuButton/out-side-logic";
import { getTodayDay, getTodayMonth, getTodayYear } from "@/lib/date";

const RadioSelectRange = ["in-progress", "completed", "custom"] as const;
type RadioSelectRange = (typeof RadioSelectRange)[number];

// 開始/終了日の範囲選択の初期値(全て今日の日付からで) TODO: 後で修正するかも
const initYear = getTodayYear();
const initMonth = getTodayMonth();
const initDay = getTodayDay();

type Props = {
  /** 閉じるハンドラー */
  onClose: () => void;
};

/**
 * タスクの表示範囲を設定するダイアログのロジック
 */
export const TaskDisplayRangeDialogLogic = ({ onClose }: Props) => {
  // 表示範囲
  const [displayRange, setDisplayRange] =
    useState<RadioSelectRange>("in-progress");
  const handleChangeDisplayRange = useCallback((v: string) => {
    if (RadioSelectRange.includes(v as RadioSelectRange)) {
      setDisplayRange(v as RadioSelectRange);
    }
  }, []);

  // 進捗
  const [progressRange, setProgressRange] = useState<number[]>([0, 90]);
  const handleChangeProgressRange = useCallback(
    (_: Event, newValue: number | number[]) => {
      if (typeof newValue === "object") {
        setProgressRange(newValue);
      }
    },
    []
  );

  // 開始日
  const {
    year: startMinYear,
    onChangeYear: onChangeStartMinYear,
    month: startMinMonth,
    onChangeMonth: onChangeStartMinMonth,
    day: startMinDay,
    onChangeDay: onChangeStartMinDay,
  } = useDateSelectMenuButton({ initYear, initMonth, initDay });
  const {
    year: startMaxYear,
    onChangeYear: onChangeStartMaxYear,
    month: startMaxMonth,
    onChangeMonth: onChangeStartMaxMonth,
    day: startMaxDay,
    onChangeDay: onChangeStartMaxDay,
  } = useDateSelectMenuButton({ initYear, initMonth, initDay });

  // 最終日
  const {
    year: lastMinYear,
    onChangeYear: onChangeLastMinYear,
    month: lastMinMonth,
    onChangeMonth: onChangeLastMinMonth,
    day: lastMinDay,
    onChangeDay: onChangeLastMinDay,
  } = useDateSelectMenuButton({ initYear, initMonth, initDay });
  const {
    year: lastMaxYear,
    onChangeYear: onChangeLastMaxYear,
    month: lastMaxMonth,
    onChangeMonth: onChangeLastMaxMonth,
    day: lastMaxDay,
    onChangeDay: onChangeLastMaxDay,
  } = useDateSelectMenuButton({ initYear, initMonth, initDay });

  // disabled関連
  const [isProgressEnable, setIsProgressEnable] = useState<boolean>(false);
  const [isStartDateEnable, setIsStartDateEnable] = useState<boolean>(false);
  const [isLastDateEnable, setIsLastDateEnable] = useState<boolean>(false);
  const toggleProgressEnable = useCallback(() => {
    setIsProgressEnable((prev) => !prev);
  }, []);
  const toggleStartDateEnable = useCallback(() => {
    setIsStartDateEnable((prev) => !prev);
  }, []);
  const toggleLastDateEnable = useCallback(() => {
    setIsLastDateEnable((prev) => !prev);
  }, []);

  const disableCustomRange = useMemo(
    () => displayRange !== "custom",
    [displayRange]
  );
  const disabledProgress = useMemo(
    () => disableCustomRange || !isProgressEnable,
    [disableCustomRange, isProgressEnable]
  );
  const disabledStartDate = useMemo(
    () => disableCustomRange || !isStartDateEnable,
    [disableCustomRange, isStartDateEnable]
  );
  const disabledLastDate = useMemo(
    () => disableCustomRange || !isLastDateEnable,
    [disableCustomRange, isLastDateEnable]
  );

  // 稼働記録なしのを表示するかのチェックボックス
  const [isCheckedUnActiveFilter, setIsCheckedUnActiveFilter] =
    useState<boolean>();
  const toggleUnActiveFilter = useCallback(() => {
    setIsCheckedUnActiveFilter((prev) => !prev);
  }, []);

  const onClickAdapt = useCallback(() => {
    // TODO:設定に応じてクエリパラメータを変更する
    onClose();
  }, [onClose]);
  return {
    /** 表示範囲(ラジオグループ) */
    displayRange,
    /** 表示範囲を変えるハンドラー(ラジオグループ) */
    handleChangeDisplayRange,
    /** 進捗の範囲 */
    progressRange,
    /** 進捗の範囲を変えるハンドラー */
    handleChangeProgressRange,
    /** 開始日の最小年 */
    startMinYear,
    /** 開始日の最小年を変更する関数 */
    onChangeStartMinYear,
    /** 開始日の最小月 */
    startMinMonth,
    /** 開始日の最小月を変更する関数 */
    onChangeStartMinMonth,
    /** 開始日の最小日 */
    startMinDay,
    /** 開始日の最小日を変更する関数 */
    onChangeStartMinDay,
    /** 開始日の最大年 */
    startMaxYear,
    /** 開始日の最大年を変更する関数 */
    onChangeStartMaxYear,
    /** 開始日の最大月 */
    startMaxMonth,
    /** 開始日の最大月を変更する関数 */
    onChangeStartMaxMonth,
    /** 開始日の最大日 */
    startMaxDay,
    /** 開始日の最大日を変更する関数 */
    onChangeStartMaxDay,
    /** 最終日の最小日 */
    lastMinDay,
    /** 最終日の最小日を変更する関数 */
    onChangeLastMinDay,
    /** 最終日の最小年 */
    lastMinYear,
    /** 最終日の最小年を変更する関数 */
    onChangeLastMinYear,
    /** 最終日の最小月 */
    lastMinMonth,
    /** 最終日の最小月を変更する関数 */
    onChangeLastMinMonth,
    /** 最終日の最大日 */
    lastMaxDay,
    /** 最終日の最大日を変更する関数 */
    onChangeLastMaxDay,
    /** 最終日の最大年 */
    lastMaxYear,
    /** 最終日の最大年を変更する関数 */
    onChangeLastMaxYear,
    /** 最終日の最大月 */
    lastMaxMonth,
    /** 最終日の最大月を変更する関数 */
    onChangeLastMaxMonth,
    /** 進捗の範囲指定の有効かどうか */
    isProgressEnable,
    /** 進捗の範囲指定の有効を切り替える関数 */
    toggleProgressEnable,
    /** 開始日の範囲指定の有効かどうか */
    isStartDateEnable,
    /** 開始日の範囲指定の有効を切り替える関数 */
    toggleStartDateEnable,
    /** 最終日の範囲指定の有効かどうか */
    isLastDateEnable,
    /** 最終日の範囲指定の有効を切り替える関数 */
    toggleLastDateEnable,
    /** メインコンテンツ部分のdisabled */
    disableCustomRange,
    /** 進捗のdisabled */
    disabledProgress,
    /** 開始日のdisabled */
    disabledStartDate,
    /** 最終日のdisabled */
    disabledLastDate,
    /** 稼働のないタスクの表示設定のうむ */
    isCheckedUnActiveFilter,
    /** 稼働のないタスクの表示設定の切り替え関数 */
    toggleUnActiveFilter,
    /** 適応を押した際のハンドラー(クエリの変更 -> 表示データを変更させる(SWRで自動的に)) */
    onClickAdapt,
  };
};
