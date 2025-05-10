import apiClient from "@/lib/apiClient";
import {
  CategoryHeaderQuery,
  CategoryHeaderQueryParams,
  CategoryOption,
} from "@/type/Category";
import useAspidaSWR from "@aspida/swr";
import { keyframes, SelectChangeEvent } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { DisplayRange } from "./component/CategoryDisplayRangeDialog/CategoryDisplayRangeDialogLogic";
import { getTodayDay, getTodayMonth, getTodayYear } from "@/lib/date";

/** クエリ(yyyy-MM-dd) -> 子のパラメータ用{y,m,d}に変換する関数 */
const queryDateToQueryParam = (dateString?: string) => {
  const [initYear, initMonth, initDay] = dateString?.split("-").map(Number) ?? [
    // クエリがない場合は初期値で今日の日付
    getTodayYear(),
    getTodayMonth(),
    getTodayDay(),
  ];
  return {
    initYear,
    initMonth,
    initDay,
  };
};

/**
 * カテゴリページのヘッダー部分のロジック
 */
export default function CategoryHeaderLogic() {
  const [optionsQuery, setOptionsQuery] = useState<URLSearchParams | null>(
    null
  );

  const queryValues = useMemo(() => {
    if (optionsQuery)
      return Object.fromEntries(optionsQuery.entries()) as CategoryHeaderQuery;
  }, [optionsQuery]);

  const queryParams: CategoryHeaderQueryParams = useMemo(() => {
    // 初期値
    if (queryValues === undefined)
      return {
        displayRange: "last-3-months",
        startDate: {
          initYear: getTodayYear(),
          initMonth: getTodayMonth(),
          initDay: getTodayDay(),
        },
        endDate: {
          initYear: getTodayYear(),
          initMonth: getTodayMonth() - 1,
          initDay: getTodayDay(),
        },
        hideCompleted: false,
      };
    const displayRange = queryValues.displayRange as DisplayRange; // ここクエリの値は必ずDisplayRangeのいずれかなのでasを使う
    const startDate = queryDateToQueryParam(queryValues.startDate);
    const endDate = queryDateToQueryParam(queryValues.endDate);
    const hideCompleted = queryValues.hideCompleted === "true" ? true : false;
    return {
      displayRange,
      startDate,
      endDate,
      hideCompleted,
    };
  }, [queryValues]);

  const handleAdaptDisplayRange = useCallback((v: URLSearchParams) => {
    setOptionsQuery(v);
  }, []);

  // TODO:日付範囲をクエリに追加して一覧取得させる
  // TODO:エンドポイント別で用意してデータもまとめて取得
  const { data } = useAspidaSWR(apiClient.work_log.categories.options, "get", {
    query: queryValues,
    key: `api/work-log/categories/options${
      queryValues !== undefined ? `?${queryValues.toString()}` : ""
    }`,
  });
  const categoryOptions: CategoryOption[] = useMemo(
    () => data?.body ?? [],
    [data?.body]
  );

  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedCategoryId = Number(searchParams.get("id") ?? 1);

  const { data: rawCategorySummaryData, isLoading: isLoadingCategorySummary } =
    useAspidaSWR(
      apiClient.work_log.categories._id(selectedCategoryId).summary,
      "get",
      { key: `api/work-log/categories/${selectedCategoryId}/summary` }
    );
  const categorySummaryData = rawCategorySummaryData?.body ?? {
    // 仮データ(実際はisLoadingで非表示)
    name: "",
    isCompleted: false,
    totalHours: 0,
    activeDate: "",
  };

  const {
    name: selectedCategoryName,
    isCompleted,
    totalHours,
    activeDate,
  } = categorySummaryData;

  const onChangeCategoryId = useCallback(
    (e: SelectChangeEvent) => {
      const newId = e.target.value;
      const param = new URLSearchParams();
      param.set("id", newId);
      router.replace(`?${param}`);
    },
    [router]
  );

  const handleComplete = useCallback(async () => {
    // TODO:BE繋ぎ込みの時にリクエスト送る
    console.log("完了状態に移行");
  }, []);
  const handleDelete = useCallback(async () => {
    // TODO:BE繋ぎ込みの時にリクエスト送る
    console.log("完了状態に移行");
  }, []);

  const growAnimation = useMemo(
    // TODO: widthどのくらいで100%いかせるか？　とりあえず100hで100%の扱いで
    () => keyframes`
         0% {
           width: 100%;
         }
         100% {
           width: ${100 - totalHours}%;
         }
       `,
    [totalHours]
  );
  return {
    /** グラフのアニメーション */
    growAnimation,
    /** クエリパラメータのオブジェクト */
    queryParams,
    /** クエリをセットする関数 */
    handleAdaptDisplayRange,
    /** カテゴリの選択賜一覧 */
    categoryOptions,
    /** 選択中のカテゴリid */
    selectedCategoryId,
    /** カテゴリの概要のロード状態 */
    isLoadingCategorySummary,
    /** 選択中のカテゴリ名 */
    selectedCategoryName,
    /** 完了状態 */
    isCompleted,
    /** 総稼働時間 */
    totalHours,
    /** 稼働の"開始~終了"の日付string */
    activeDate,
    /** 選択中のカテゴリを変更する関数 */
    onChangeCategoryId,
    /** 完了状態に移行するハンドラー */
    handleComplete,
    /** 削除するハンドラー */
    handleDelete,
  };
}
