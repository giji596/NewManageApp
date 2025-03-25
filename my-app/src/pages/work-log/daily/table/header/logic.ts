/**
 * 日付ページのテーブルコンポーネントのヘッダーのロジック
 */
export const DailyTableHeaderLogic = () => {
  const tableTitles: string[] = [
    "日付",
    "メインカテゴリ",
    "メインタスク",
    "メモ",
    "合計稼働時間",
  ];
  return {
    /** テーブルのタイトル一覧 */
    tableTitles,
  };
};
