import { useCallback } from "react";

/**
 * 日付ページのテーブルコンポーネントのヘッダーのロジック
 */
export const DailyTableHeaderLogic = () => {
  const headerColumnDisplay = {
    日付: "none",
    メインカテゴリ: "checkbox",
    メインタスク: "checkbox",
    メモ: "title",
    合計稼働時間: "none",
  } as const;

  const getPopperIdRef = useCallback(
    (title: string) => (title == "メインカテゴリ" ? 10000 : 10001),
    []
  );

  return {
    /** key:テーブルのタイトル名 value:ホバー時のメニュー表示の設定 のオブジェクト */
    headerColumnDisplay,
    /** ポッパー用のidRefを取得する関数
     * メインカテゴリ:10000
     * メインタスク:10001
     */
    getPopperIdRef,
  };
};
