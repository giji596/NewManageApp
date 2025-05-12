import apiClient from "@/lib/apiClient";
import useAspidaSWR from "@aspida/swr";
import axios from "axios";
import { notFound, useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { mutate } from "swr";

type Props = {
  /** パスパラメータのid(ページ呼び出し時に自動的に取得) */
  id: string;
};
/**
 * タスク詳細ページのカスタムフック
 */
export default function useTaskDetailPage({ id }: Props) {
  const [openError, setOpenError] = useState<boolean>(false);
  const onCloseError = useCallback(() => setOpenError(false), []);
  const router = useRouter();
  const {
    data: rawData,
    error,
    isLoading,
  } = useAspidaSWR(apiClient.work_log.tasks._id(id), "get", {
    key: `api/work-log/tasks/${id}`,
  });
  // エラー時にcodeが404であればNotFoundページを表示する
  if (error) {
    if (error.status === 404) notFound();
  }
  // 初期ロード時はisLoading=trueとなりdataは利用されないので、null時のデータは利用されない
  const data = useMemo(() => {
    if (rawData) {
      const memos = rawData.body.memo.map((v) => {
        return { ...v, date: new Date(v.date) };
      });
      return { ...rawData.body, memo: memos };
    } else {
      return {
        id: 1,
        name: "タスク1",
        category: { id: 1, name: "カテゴリ1" },
        isFavorite: false,
        progress: 70,
        totalHours: 35,
        startDate: "",
        lastDate: "",
        memo: [],
      };
    }
  }, [rawData]);
  const taskName = data.name;
  const categoryId = data.category.id;
  const categoryName = data.category.name;
  const isFavorite = data.isFavorite;
  const progress = data.progress;
  const totalHours = data.totalHours;
  const startDateString = useMemo(
    () => data.startDate.replaceAll("-", "/").split("T")[0],
    [data.startDate]
  );
  const lastDateString = useMemo(
    () => data.lastDate.replaceAll("-", "/").split("T")[0],
    [data.lastDate]
  );
  const memoList = useMemo(() => data.memo, [data.memo]); // タスク名の更新時の再フェッチ時に更新しないように設定

  const isCompleted = useMemo(() => progress === 100, [progress]);
  const handleComplete = useCallback(async () => {
    await apiClient.work_log.tasks._id(id).patch({ body: { progress: 100 } });
    // データ更新後に再検証してUIに即時反映
    mutate(`api/work-log/tasks/${id}`);
  }, [id]);
  const handleDelete = useCallback(async () => {
    try {
      await apiClient.work_log.tasks._id(id).delete();
      // 現在のページのキャッシュを削除(再検証は不要なのでfalseで)
      mutate(`api/work-log/tasks/${id}`, undefined, { revalidate: false });
      // 一覧ページへ移動
      router.push("/work-log/task");
    } catch (error) {
      // エラーコードが400の場合に利用中を削除した際のエラーとする
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 400) {
          setOpenError(true);
        }
      }
    }
  }, [id, router]);

  const navigateCategoryPage = useCallback(() => {
    router.push(`/work-log/category?id=${categoryId}`);
  }, [categoryId, router]);
  return {
    /** エラーメッセージの表示 */
    openError,
    /** エラーメッセージ閉じるハンドラ */
    onCloseError,
    /** ロード状態 */
    isLoading,
    /** タスク名 */
    taskName,
    /** カテゴリid */
    categoryId,
    /** カテゴリ名 */
    categoryName,
    /** お気に入りか */
    isFavorite,
    /** 進捗率 */
    progress,
    /** 合計稼働時間 */
    totalHours,
    /** 開始日(string) */
    startDateString,
    /** 最終実施日(string) */
    lastDateString,
    /** メモリスト */
    memoList,
    /** 完了状態かどうか(progress===100) */
    isCompleted,
    /** 完了処理を行うハンドラー */
    handleComplete,
    /** 削除処理を行うハンドラー */
    handleDelete,
    /** カテゴリページへ移動するハンドラー */
    navigateCategoryPage,
  };
}
