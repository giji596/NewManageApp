import { useMemo } from "react";

type Props = {
  /** 選択状態 */
  isSelected: boolean;
};

/**
 * デザインに関するまとめ
 */
export default function useHeaderLabelDesign({ isSelected }: Props) {
  const customDesign = useMemo(
    () => ({
      display: "inline-flex", // ラベルの大きさに合わせる
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "16px", // 楕円っぽい形
      padding: "4px 12px",
      transition: "background-color 0.2s",
      backgroundColor: isSelected ? "rgba(0, 0, 0, 0.07)" : "transparent",
      "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.1)" }, // ホバー時にグレー
      "&:active": { backgroundColor: "rgba(0, 0, 0, 0.2)" }, // クリック時に濃いグレー
    }),
    [isSelected]
  );
  return {
    /** 選択状態によって変わるテーブルのデザイン(メモ化済み) */
    customDesign,
  };
}
