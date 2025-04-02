import { useCallback } from "react";

/**
 * 日付詳細ページのタスクテーブルのヘッダーコンポーネントのロジック
 */
export default function TaskTableHeaderLogic() {
  const headerColumnDisplay: Record<string, string> = {
    タスク名: "checkbox",
    カテゴリ名: "checkbox",
    稼働時間: "none",
  };

  const getPopperIdRef = useCallback(
    (title: string) => (title == "タスク名" ? 10000 : 10001),
    []
  );

  const getWidth = useCallback((title: string) => {
    if (title == "タスク名") return "40%";
    if (title == "カテゴリ名") return "35%";
    if (title == "稼働時間") return "25%";
  }, []);
  return {
    /** key:ヘッダーのタイトル,value:タイトルの種類(ソートの可否・フィルターの可否) */
    headerColumnDisplay,
    /** タイトルから固有のidを与える タスク名:10000,カテゴリ名：10001 */
    getPopperIdRef,
    /** そのタイトルの幅を取得する関数 */
    getWidth,
  };
}
