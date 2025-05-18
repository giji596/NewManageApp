import { useCallback, useState } from "react";

type Props = {
  /** 削除の確認ダイアログを閉じるハンドラー */
  onOpenDelete: () => void;
};
/**
 * タグ編集ダイアログのタグ一覧のリストのロジック
 */
export const TagListLogic = ({ onOpenDelete }: Props) => {
  const [editTargetId, setEditTargetId] = useState<number | null>(null); // null=選択なし
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null); // null=選択なし
  const isEditTargetId = useCallback(
    (id: number) => editTargetId === id,
    [editTargetId]
  );
  const setEditTarget = useCallback((id: number) => setEditTargetId(id), []);
  const clearEditTarget = useCallback(() => setEditTargetId(null), []);

  const handleDelete = useCallback(async (id: number) => {
    // TODO: ここで削除リクエスト
    console.log("削除対象:", id);
    //　削除後にターゲットをnullにする
    setDeleteTargetId(null);
  }, []);
  const onClickDelete = useCallback(
    (targetId: number, isUsed: boolean) => {
      // 利用中である場合は削除対象に設定後にダイアログを開く
      if (isUsed) {
        setDeleteTargetId(targetId);
        onOpenDelete();
      } else {
        // 利用中でない場合はそのまま削除
        handleDelete(targetId);
      }
    },
    [handleDelete, onOpenDelete]
  );

  return {
    /** 削除対象のid(ダイアログで利用) */
    deleteTargetId,
    /** 与えられたidが編集対象であるかどうか */
    isEditTargetId,
    /** 対象を編集対象にセットする関数 */
    setEditTarget,
    /** 編集対象を解除(nullに)する関数 */
    clearEditTarget,
    /** タグを削除するハンドラー */
    handleDelete,
    /** 削除をクリックした際のハンドラー */
    onClickDelete,
  };
};
