import { localClient } from "@/lib/localClient";
import { notFound, useParams, useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import useSWR, { mutate } from "swr";

/**
 * タスク詳細ページのカスタムフック
 */
export default function useTaskDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [openError, setOpenError] = useState<boolean>(false);
  const onCloseError = useCallback(() => setOpenError(false), []);
  const router = useRouter();
  const {
    data: rawData,
    error,
    isLoading,
  } = useSWR(
    `api/work-log/tasks/${id}`,
    localClient.work_log.tasks._id(Number(id)).get()
  );
  // エラー時にcodeが404であればNotFoundページを表示する
  if (error) {
    if (error.status === 404) notFound();
  }
  // 初期ロード時はisLoading=trueとなりdataは利用されないので、null時のデータは利用されない
  const data = useMemo(() => {
    if (rawData) {
      const memos = rawData.memo.map((v) => {
        return { ...v, date: new Date(v.date) };
      });
      return { ...rawData, memo: memos };
    } else {
      return {
        id: 1,
        name: "タスク1",
        category: { id: 1, name: "カテゴリ1" },
        isFavorite: false,
        progress: 70,
        totalHours: 35,
        firstActivityDate: "",
        lastActivityDate: "",
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
  const firstActivityDateString = useMemo(
    () => data.firstActivityDate?.replaceAll("-", "/").split("T")[0] ?? null,
    [data.firstActivityDate]
  );
  const lastActivityDateString = useMemo(
    () => data.lastActivityDate?.replaceAll("-", "/").split("T")[0] ?? null,
    [data.lastActivityDate]
  );
  const memoList = useMemo(() => data.memo, [data.memo]); // タスク名の更新時の再フェッチ時に更新しないように設定

  const isCompleted = useMemo(() => progress === 100, [progress]);
  const handleComplete = useCallback(async () => {
    await localClient.work_log.tasks
      ._id(Number(id))
      .patch({ body: { progress: 100 } });
    // データ更新後に再検証してUIに即時反映
    mutate(`api/work-log/tasks/${id}`);
    // 一覧データも再検証
    mutate(
      (key) => Array.isArray(key) && key[0] === "api/work-log/tasks",
      undefined // キャッシュを削除(一覧データではキャッシュがある場合利用する設定であるので)
    );
    // 選択賜についても再検証
    mutate(
      (key) =>
        Array.isArray(key) &&
        key[0] === "api/work-log/tasks/options/" &&
        key[1] === `categoryId=${categoryId}`,
      undefined // キャッシュ削除
    );
  }, [categoryId, id]);
  const handleDelete = useCallback(async () => {
    try {
      await localClient.work_log.tasks._id(Number(id)).delete();
      // 現在のページのキャッシュを削除(再検証は不要なのでfalseで)
      mutate(`api/work-log/tasks/${id}`, undefined, { revalidate: false });
      // 一覧データも再検証
      mutate(
        (key) => Array.isArray(key) && key[0] === "api/work-log/tasks",
        undefined // キャッシュを削除(一覧データではキャッシュがある場合利用する設定であるので)
      );
      // 一覧ページへ移動
      router.push("/work-log/task");
    } catch (error) {
      // エラーメッセージがrelationship errorの場合はエラーメッセージを表示する
      if (error instanceof Error && error.message === "relationship error") {
        setOpenError(true);
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
    firstActivityDateString,
    /** 最終実施日(string) */
    lastActivityDateString,
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
