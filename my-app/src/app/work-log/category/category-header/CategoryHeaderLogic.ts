import apiClient from "@/lib/apiClient";
import { CategoryHeaderQueryParams, CategoryOption } from "@/type/Category";
import useAspidaSWR from "@aspida/swr";
import { keyframes, SelectChangeEvent } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { DisplayRange } from "./component/CategoryDisplayRangeDialog/CategoryDisplayRangeDialogLogic";
import { getTodayDay, getTodayMonth, getTodayYear } from "@/lib/date";

/**
 * カテゴリページのヘッダー部分のロジック
 */
export default function CategoryHeaderLogic() {
  const [queryString, setQueryString] = useState<string>("");

  const queryParams = useMemo(() => {
    // {queryName:Value,...}
    const queryValues: CategoryHeaderQueryParams =
      // ["queryName=Value",...]
      queryString.split("&").reduce(
        (acc, v) => {
          const [key, value] = v.split("=");
          if (key && value !== undefined) {
            if (key === "displayRange") {
              acc[key] = value as DisplayRange;
            }
            if (key === "hideCompleted") {
              acc[key] = value === "true" ? true : false;
            }
            if (key === "startDate" || key === "endDate") {
              // "year-month-day" -> [year,month,day]
              const formatted = decodeURIComponent(value).split("-");
              const dateValues = {
                initYear: Number(formatted[0]),
                initMonth: Number(formatted[1]),
                initDay: Number(formatted[2]),
              };
              acc[key] = dateValues;
            }
          }
          // {queryName:Value}
          return acc;
        },
        // 初期値
        {
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
        } as CategoryHeaderQueryParams
      );
    return queryValues;
  }, [queryString]);

  const handleAdaptDisplayRange = useCallback((v: string) => {
    setQueryString(v);
  }, []);

  // TODO:日付範囲をクエリに追加して一覧取得させる
  // TODO:エンドポイント別で用意してデータもまとめて取得
  const { data } = useAspidaSWR(apiClient.work_log.categories.options, "get", {
    key: "api/work-log/categories/options",
  });
  const categoryOptions: CategoryOption[] = useMemo(
    () => data?.body ?? [],
    [data?.body]
  );

  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedCategoryId = Number(searchParams.get("id") ?? 1);
  const selectedCategoryName = useMemo(
    () => categoryOptions.find((v) => v.id === selectedCategoryId)?.name ?? "",
    [categoryOptions, selectedCategoryId]
  );
  // TODO: 上のデータフェッチ時に取得させるように変更
  const isCompleted = true;
  const totalHours = 80;
  const activeDate = "2025/04/29~2025/05/04";

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
