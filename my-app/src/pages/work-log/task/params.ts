import { DUMMY_TASK_SUMMARY_DATA } from "@/dummy/task-page";
import {
  createRef,
  RefObject,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { TaskSummaryTableBodyHandle } from "./table/body/TaskSummaryTableBodyLogic";

/**
 * タスク一覧ページのパラメータ関連
 */
export default function TaskSummaryPageParams() {
  // TODO:データフェッチさせる
  const taskSummaryData = DUMMY_TASK_SUMMARY_DATA;
  const isLoading = false;

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
  console.log(isDirtyRecord);

  const initialRef = taskSummaryData.reduce<
    Record<number, RefObject<TaskSummaryTableBodyHandle | null>>
  >((a, b) => {
    const key = b.id;
    const value = createRef<TaskSummaryTableBodyHandle>();
    return { ...a, [key]: value };
  }, {});
  // 各行の参照(key:タスクのid,value:各行のメソッド(saveとreset用))
  const rowRefs =
    useRef<Record<number, RefObject<TaskSummaryTableBodyHandle | null>>>(
      initialRef
    );

  // 変更のある対象のキーを取得する関数
  const getTargetKeys = useCallback(() => {
    const keys = Object.keys(rowRefs.current);
    const filtered = keys.filter((key) => isDirtyRecord[Number(key)] === true);
    return filtered;
  }, [isDirtyRecord]);

  const handleSaveAll = useCallback(async () => {
    const result = [];
    const targetKeys = getTargetKeys(); // 変更のあるキーのみを取得
    // 更新データを取得
    for (const key of targetKeys) {
      const ref = rowRefs.current[Number(key)];
      const data = ref.current?.getFormData();
      result.push({ id: Number(key), ...data }); // 判別ようにidを付与
    }
    // TODO:ここでデータ送信
    console.log("送信データ", result);
    // TODO:この後にデータフェッチ => await => フォームresetで更新後の値を適応させる
  }, [getTargetKeys]);

  const handleResetAll = useCallback(() => {
    const targetKeys = getTargetKeys();
    for (const key of targetKeys) {
      const ref = rowRefs.current[Number(key)];
      ref.current?.resetFormData(); // ここで初期化
    }
  }, [getTargetKeys]);

  return {
    /** タスク一覧 */
    taskSummaryData,
    /** ロード状態 */
    isLoading,
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
  };
}
