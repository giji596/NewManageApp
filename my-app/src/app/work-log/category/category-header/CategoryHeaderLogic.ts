import apiClient from "@/lib/apiClient";
import {
  CategoryHeaderQuery,
  CategoryHeaderQueryParams,
  CategoryOption,
} from "@/type/Category";
import { keyframes, SelectChangeEvent } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DisplayRange } from "./component/CategoryDisplayRangeDialog/CategoryDisplayRangeDialogLogic";
import { getTodayDay, getTodayMonth, getTodayYear } from "@/lib/date";
import useSWR, { mutate } from "swr";
import axios from "axios";
import { localClient } from "@/lib/localClient";

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
  const [openError, setOpenError] = useState<boolean>(false);
  const onCloseError = useCallback(() => setOpenError(false), []);

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

  const { data, isLoading: isLoadingOptions } = useSWR(
    optionsQuery
      ? ["api/work-log/categories/options", optionsQuery.toString()]
      : ["api/work-log/categories/options", "displayRange=all"], // クエリなしの場合とallの場合は同じ範囲

    localClient.work_log.categories.options.get({
      query: queryValues,
    })
  );
  const categoryOptions: CategoryOption[] = useMemo(() => data ?? [], [data]);

  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedCategoryId = Number(searchParams.get("id") ?? 0);

  // パラメータの有無をbooleanで関数化することでuseEffectの依存値から除く
  const isNoParam = useMemo(
    () => searchParams.get("id") === null,
    [searchParams]
  );
  // 初期化処理 パラメータが空の場合にセットする
  useEffect(() => {
    // パラメータが空(初回 or データなし) かつ カテゴリ一覧をフェッチ後に行う
    if (isNoParam && categoryOptions.length > 0) {
      const defaultId = categoryOptions[0].id;
      // [0]データが0(データなし)でない場合のみパラメータを変更する
      if (defaultId !== 0) {
        router.replace(`?id=${defaultId}`);
      }
    }
  }, [categoryOptions, router, isNoParam]);
  // カテゴリ一覧更新時 一番上の値をセットする
  useEffect(() => {
    if (optionsQuery && categoryOptions.length > 0) {
      router.replace(
        categoryOptions[0].id !== 0
          ? `?id=${categoryOptions[0].id}`
          : "category" // id=0の場合はクエリなし
      );
    }
  }, [categoryOptions, optionsQuery, router]);
  const isSelectedIdAvailable = useMemo(
    () => categoryOptions.some((v) => v.id === selectedCategoryId),
    [categoryOptions, selectedCategoryId]
  );
  const { data: rawCategorySummaryData, isLoading: isLoadingCategorySummary } =
    useSWR(
      // カテゴリ選択が0(カテゴリがない場合の値)であればkeyをnullにしてフェッチさせない
      selectedCategoryId === 0
        ? null
        : `api/work-log/categories/${selectedCategoryId}/summary`,
      localClient.work_log.categories._id(selectedCategoryId).summary.get()
    );
  const categorySummaryData = rawCategorySummaryData ?? {
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
    // 更新処理
    await localClient.work_log.categories
      ._id(selectedCategoryId)
      .complete.patch();
    // カテゴリページの概要データを再検証
    mutate(`api/work-log/categories/${selectedCategoryId}/summary`);
    // タスクリストのデータについても再検証
    mutate(`api/work-log/categories/${selectedCategoryId}/tasks`);
  }, [selectedCategoryId]);
  const handleDelete = useCallback(async () => {
    try {
      // 削除処理
      await apiClient.work_log.categories._id(selectedCategoryId).delete();
      // 一覧データを再検証
      await mutate(
        (key) =>
          Array.isArray(key) && key[0] === "api/work-log/categories/options"
      );
      // 選択中のidを再検証後のデータの先頭に変更
      router.replace(`?id=${categoryOptions[0].id}`);
    } catch (error) {
      // エラーコードが400の場合に利用中を削除した際のエラーとする
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 400) {
          setOpenError(true);
        }
      }
    }
  }, [categoryOptions, router, selectedCategoryId]);

  const growAnimation = useMemo(
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

  const isNoCategory = useMemo(
    () => selectedCategoryId === 0,
    [selectedCategoryId]
  );
  return {
    /** エラーメッセージの表示 */
    openError,
    /** エラーメッセージ閉じるハンドラ */
    onCloseError,
    /** グラフのアニメーション */
    growAnimation,
    /** クエリパラメータのオブジェクト */
    queryParams,
    /** クエリをセットする関数 */
    handleAdaptDisplayRange,
    /** カテゴリの選択賜一覧 */
    categoryOptions,
    /** カテゴリ選択賜のロード状態 */
    isLoadingOptions,
    /** 選択中のカテゴリid */
    selectedCategoryId,
    /** 選択中のカテゴリidが存在するか */
    isSelectedIdAvailable,
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
    /** カテゴリーの有無 */
    isNoCategory,
  };
}
