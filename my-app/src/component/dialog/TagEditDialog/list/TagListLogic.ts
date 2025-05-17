import { useCallback, useState } from "react";

/**
 * タグ編集ダイアログのタグ一覧のリストのロジック
 */
export const TagListLogic = () => {
  const [editTargetId, setEditTargetId] = useState<number | null>(null); // null=選択なし
  const isEditTargetId = useCallback(
    (id: number) => editTargetId === id,
    [editTargetId]
  );
  const setEditTarget = useCallback((id: number) => setEditTargetId(id), []);
  const clearEditTarget = useCallback(() => setEditTargetId(null), []);

  const handleDelete = useCallback(async (id: number) => {
    // TODO: ここで削除リクエスト
    console.log("削除対象:", id);
  }, []);
  return {
    /** 与えられたidが編集対象であるかどうか */
    isEditTargetId,
    /** 対象を編集対象にセットする関数 */
    setEditTarget,
    /** 編集対象を解除(nullに)する関数 */
    clearEditTarget,
    /** タグを削除するハンドラー */
    handleDelete,
  };
};
