import apiClient from "@/lib/apiClient";
import { CategoryOption } from "@/type/Category";
import useAspidaSWR from "@aspida/swr";
import { keyframes, SelectChangeEvent } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

/**
 * カテゴリページのヘッダー部分のロジック
 */
export default function CategoryHeaderLogic() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const setDateRange = useCallback((start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
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
    /** 取得範囲の開始日(null時は無効) */
    startDate,
    /** 取得範囲の終了日(null時は無効) */
    endDate,
    /** 日付範囲を設定する関数 */
    setDateRange,
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
