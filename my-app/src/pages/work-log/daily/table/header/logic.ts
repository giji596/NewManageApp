import { useCallback } from "react";

type Props = {
  /** タイトルが選択中かどうかを調べる関数 */
  isSelected: (title: string) => boolean;
};
/**
 * 日付ページのテーブルコンポーネントのヘッダーのロジック
 */
export const DailyTableHeaderLogic = ({ isSelected }: Props) => {
  const headerColumnDisplay = {
    日付: "none",
    メインカテゴリ: "checkbox",
    メインタスク: "checkbox",
    メモ: "title",
    合計稼働時間: "none",
  } as const;

  /**
   * テーブルメニューの選択かどうか:title==selectedTitle or checkSelected(title)で取得
   * useMemoの場合：
   */
  const getButtonDesign = useCallback(
    (title: string) => ({
      display: "inline-flex", // ラベルの大きさに合わせる
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "16px", // 楕円っぽい形
      padding: "4px 12px",
      transition: "background-color 0.2s",
      backgroundColor: isSelected(title)
        ? "rgba(0, 0, 0, 0.07)"
        : "transparent",
      "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.1)" }, // ホバー時にグレー
      "&:active": { backgroundColor: "rgba(0, 0, 0, 0.2)" }, // クリック時に濃いグレー
    }),
    [isSelected]
  );

  return {
    /** key:テーブルのタイトル名 value:ホバー時のメニュー表示の設定 のオブジェクト */
    headerColumnDisplay,
    /** ボタンのデザイン情報を取得する関数 */
    getButtonDesign,
  };
};
