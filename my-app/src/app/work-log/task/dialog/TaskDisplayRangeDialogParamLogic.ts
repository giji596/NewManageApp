import { useCallback, useMemo, useState } from "react";
import { useDateSelect } from "@/hook/useDateSelect";
import { getTodayDay, getTodayMonth, getTodayYear } from "@/lib/date";
import { useRouter, useSearchParams } from "next/navigation";

const RadioSelectRange = ["in-progress", "completed", "custom"] as const;
export type RadioSelectRange = (typeof RadioSelectRange)[number];

// 開始/終了日の範囲選択の初期値(全て今日の日付からで) TODO: 後で修正するかも
const initYear = getTodayYear();
const initMonth = getTodayMonth();
const initDay = getTodayDay();

type Props = {
  /** 閉じるハンドラー */
  onClose: () => void;
  /** 進捗の範囲指定の有効かどうか */
  isProgressEnable: boolean;
  /** 開始日の範囲指定の有効かどうか */
  isStartDateEnable: boolean;
  /** 最終日の範囲指定の有効かどうか */
  isLastDateEnable: boolean;
};

/**
 * タスクの表示範囲を設定するダイアログのロジック
 */
export const TaskDisplayRangeDialogParamLogic = ({
  onClose,
  isProgressEnable,
  isStartDateEnable,
  isLastDateEnable,
}: Props) => {
  // ナビゲーション関連
  const router = useRouter();
  // パラメータ
  const param = useSearchParams();
  // 表示範囲
  const initDisplayRange: RadioSelectRange = useMemo(() => {
    // startDate/lastDateがある場合はcustom
    if (!!param.get("startDate") || !!param.get("lastDate")) return "custom";
    const progressParam = param.get("progress");
    switch (progressParam) {
      // progressの値に応じて分岐
      // nullの場合(未設定)の場合もin-progressとする
      case null:
      case "0,90":
        return "in-progress";
      case "100,100":
        return "completed";
      default:
        return "custom";
    }
  }, [param]);
  const [displayRange, setDisplayRange] =
    useState<RadioSelectRange>(initDisplayRange);
  const handleChangeDisplayRange = useCallback((v: string) => {
    if (RadioSelectRange.includes(v as RadioSelectRange)) {
      setDisplayRange(v as RadioSelectRange);
    }
  }, []);

  // 進捗
  const initProgressRange = useMemo(
    () =>
      // パラメータあれば(0,90など)splitでstring[]化 -> mapでnumber[]化して初期値
      param
        .get("progress")
        ?.split(",")
        .map((v) => Number(v)) ?? [0, 90], // なければ[0,90]渡す
    [param]
  );
  const [progressRange, setProgressRange] =
    useState<number[]>(initProgressRange);
  const handleChangeProgressRange = useCallback(
    (_: Event, newValue: number | number[]) => {
      if (typeof newValue === "object") {
        setProgressRange(newValue);
      }
    },
    []
  );

  // 日付範囲
  const getInitDateParam = useCallback(
    (name: string, isMin: boolean) => {
      const target = param.get(name);
      if (target !== null && target !== "") {
        const param = target.split(",")[isMin ? 0 : 1].split("-");
        return {
          initYear: Number(param[0]),
          initMonth: Number(param[1]),
          initDay: Number(param[2]),
        };
      }
      return { initYear, initMonth, initDay };
    },
    [param]
  );
  // 初期値 TODO: 実装時に要テスト(クエリと一致してるか)
  const initStartMinParam = useMemo(
    () => getInitDateParam("startDate", true),
    [getInitDateParam]
  );
  const initStartMaxParam = useMemo(
    () => getInitDateParam("startDate", false),
    [getInitDateParam]
  );
  const initLastMinParam = useMemo(
    () => getInitDateParam("lastDate", true),
    [getInitDateParam]
  );
  const initLastMaxParam = useMemo(
    () => getInitDateParam("lastDate", false),
    [getInitDateParam]
  );
  // 開始日
  const { dateParam: startMinParam, ...startMinSelectRangeParams } =
    useDateSelect({
      ...initStartMinParam,
    });
  const { dateParam: startMaxParam, ...startMaxSelectRangeParams } =
    useDateSelect({
      ...initStartMaxParam,
    });

  // 最終日
  const { dateParam: lastMixParam, ...lastMinSelectRangeParams } =
    useDateSelect({
      ...initLastMinParam,
    });
  const { dateParam: lastMaxParam, ...lastMaxSelectRangeParams } =
    useDateSelect({
      ...initLastMaxParam,
    });

  // 稼働記録なしのを表示するかのチェックボックス
  // 初期値(あればtrue,なければfalse)
  const initCheckUnActive = useMemo(() => !!param.get("activeOnly"), [param]);
  const [isCheckedUnActiveFilter, setIsCheckedUnActiveFilter] =
    useState<boolean>(initCheckUnActive);
  const toggleUnActiveFilter = useCallback(() => {
    setIsCheckedUnActiveFilter((prev) => !prev);
  }, []);

  const onClickAdapt = () => {
    // 空のクエリ
    const params = new URLSearchParams();
    // 稼働記録なしかのチェック
    if (isCheckedUnActiveFilter) {
      params.set("activeOnly", "true");
    }
    switch (displayRange) {
      case "in-progress": {
        params.set("progress", "0,90");
        break;
      }
      case "completed": {
        params.set("progress", "100,100");
        break;
      }
      case "custom": {
        if (isProgressEnable)
          params.set("progress", `${progressRange[0]},${progressRange[1]}`);
        if (isStartDateEnable) {
          // min<maxかどうかチェック(逆なら逆にする)
          const startDateParam =
            startMinParam < startMaxParam
              ? `${startMinParam},${startMaxParam}`
              : `${startMaxParam},${startMinParam}`;
          params.set("startDate", startDateParam);
        }
        if (isLastDateEnable) {
          // min<maxかどうかチェック(逆なら逆にする)
          const lastDateParam =
            lastMixParam < lastMaxParam
              ? `${lastMixParam},${lastMaxParam}`
              : `${lastMixParam},${startMinParam}`;
          params.set("lastDate", lastDateParam);
        }
      }
    }
    // replaceで同様のページを保持して(戻るできる必要ないので)クエリ置き換え
    router.replace(`?${params.toString()}`);
    onClose();
  };
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
