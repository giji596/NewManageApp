import {
  createRef,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { TaskSummaryTableBodyHandle } from "./table/body/TaskSummaryTableBodyLogic";
import { useRouter, useSearchParams } from "next/navigation";
import useAspidaSWR from "@aspida/swr";
import apiClient from "@/lib/apiClient";
import { TaskSummary } from "@/type/Task";
import { mutate } from "swr";
import { getTaskSummaryQuery } from "@/lib/query";

/**
 * タスク一覧ページのパラメータ関連
 */
export default function useTaskSummaryPage() {
  const router = useRouter();
  const params = useSearchParams();
  const query = useMemo(() => getTaskSummaryQuery(params), [params]);
  const { data, isLoading, isValidating } = useAspidaSWR(
    apiClient.work_log.tasks,
    "get",
    { query, key: ["api/work-log/tasks?", query], revalidateIfStale: false }
  );
  // TODO:データフェッチさせる
  const rawData = useMemo(() => data?.body ?? [], [data?.body]);
  const taskSummaryData: TaskSummary[] = useMemo(
    () =>
      rawData.map((v) => {
        return {
          ...v,
          startDate: new Date(v.startDate),
          lastDate: new Date(v.lastDate),
        };
      }),
    [rawData]
  );
  console.log(taskSummaryData);

  const [isDirtyRecord, setIsDirtyRecord] = useState<Record<number, boolean>>(
    {}
  );
  const onDirtyChange = useCallback((id: number, isDirty: boolean) => {
    setIsDirtyRecord((prev) => ({ ...prev, [id]: isDirty }));
  }, []);

  const isDirty = useMemo(
    () => !Object.values(isDirtyRecord).every((value) => value === false),
    [isDirtyRecord]
  );

  const getInitialRef = useCallback(
    () =>
      taskSummaryData.reduce<
        Record<number, RefObject<TaskSummaryTableBodyHandle | null>>
      >((a, b) => {
        const key = b.id;
        const value = createRef<TaskSummaryTableBodyHandle>();
        return { ...a, [key]: value };
      }, {}),
    [taskSummaryData]
  );
  // 各行の参照(key:タスクのid,value:各行のメソッド(saveとreset用))
  const rowRefs = useRef<
    Record<number, RefObject<TaskSummaryTableBodyHandle | null>>
  >({});
  // refの初期化
  useEffect(() => {
    if (taskSummaryData && Object.keys(rowRefs.current).length === 0) {
      rowRefs.current = getInitialRef();
    }
  }, [getInitialRef, taskSummaryData]);

  // 変更のある対象のキーを取得する関数
  const getTargetKeys = useCallback(() => {
    const keys = Object.keys(rowRefs.current);
    const filtered = keys.filter((key) => isDirtyRecord[Number(key)] === true);
    return filtered;
  }, [isDirtyRecord]);

  const updateAll = useCallback(
    async (data: { id: number; progress?: number; isFavorite?: boolean }[]) => {
      // データをまとめて変更
      await apiClient.work_log.tasks.bulk_update.patch({ body: data });
      // 再検証
      mutate((key) => Array.isArray(key) && key[0] === "api/work-log/tasks");
    },
    []
  );
  const handleSaveAll = useCallback(async () => {
    const result = [];
    const targetKeys = getTargetKeys(); // 変更のあるキーのみを取得
    // 更新データを取得
    for (const key of targetKeys) {
      const ref = rowRefs.current[Number(key)];
      const data = ref.current?.getFormData();
      result.push({ id: Number(key), ...data }); // 判別ようにidを付与
    }
    updateAll(result);
  }, [getTargetKeys, updateAll]);

  const handleResetAll = useCallback(() => {
    const targetKeys = getTargetKeys();
    for (const key of targetKeys) {
      const ref = rowRefs.current[Number(key)];
      ref.current?.resetFormData(); // ここで初期化
    }
  }, [getTargetKeys]);

  // 選択状態について
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const handleSelectItem = useCallback((id: number) => {
    setSelectedItemId((prev) => {
      // 選択中のアイテムを再度クリックした場合は選択を解除(null)
      if (prev === id) return null;
      // 上記を除いた全ての場合洗濯中のアイテムにそのidを設定する
      return id;
    });
  }, []);
  const isAnyItemSelected = !!selectedItemId;

  // なびげーしょん
  const navigateToDetail = useCallback(
    () => router.push(`/work-log/task/${selectedItemId}`),
    [router, selectedItemId]
  );
  return {
    /** タスク一覧 */
    taskSummaryData,
    /** ロード状態 */
    isLoading,
    /** 検証状態 */
    isValidating,
    /** 各行のref値(各行のメソッドを呼び出すのに必要) */
    rowRefs,
    /** dirty状態を切り替える関数(各行について切り替え) */
    onDirtyChange,
    /** dirtyかどうか(全ての行がdirtyでない場合のみfalse) */
    isDirty,
    /** まとめてセーブを行う関数 */
    handleSaveAll,
    /** まとめてリセットを行う関数 */
    handleResetAll,
    /** 選択中のアイテムid */
    selectedItemId,
    /** アイテム選択時のハンドラー */
    handleSelectItem,
    /** いずれかのアイテムが選択されているか */
    isAnyItemSelected,
    /** 詳細ページへのナビゲーション */
    navigateToDetail,
  };
}
