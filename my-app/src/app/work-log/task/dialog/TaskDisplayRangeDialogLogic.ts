import { useCallback, useState } from "react";
import { useDateSelectMenuButton } from "./component/DateSelectMenuButton/out-side-logic";
import { getTodayDay, getTodayMonth, getTodayYear } from "@/lib/date";

const RadioSelectRange = ["in-progress", "completed", "custom"] as const;
export type RadioSelectRange = (typeof RadioSelectRange)[number];

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
  const startMinSelectRangeParams = useDateSelectMenuButton({
    initYear,
    initMonth,
    initDay,
  });
  const startMaxSelectRangeParams = useDateSelectMenuButton({
    initYear,
    initMonth,
    initDay,
  });

  // 最終日
  const lastMinSelectRangeParams = useDateSelectMenuButton({
    initYear,
    initMonth,
    initDay,
  });
  const lastMaxSelectRangeParams = useDateSelectMenuButton({
    initYear,
    initMonth,
    initDay,
  });

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
    /** 開始日の最小値のパラメータ群 */
    startMinSelectRangeParams,
    /** 開始日の最大値のパラメータ群 */
    startMaxSelectRangeParams,
    /** 最終日の最小値のパラメータ群 */
    lastMinSelectRangeParams,
    /** 最終日の最小値のパラメータ群 */
    lastMaxSelectRangeParams,
    /** 稼働のないタスクの表示設定のうむ */
    isCheckedUnActiveFilter,
    /** 稼働のないタスクの表示設定の切り替え関数 */
    toggleUnActiveFilter,
    /** 適応を押した際のハンドラー(クエリの変更 -> 表示データを変更させる(SWRで自動的に)) */
    onClickAdapt,
  };
};
