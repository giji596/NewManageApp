import { useCallback, useRef, useState } from "react";
import { SubmitTagData } from "./EditTagItem/EditTagItemLogic";
import { mutate } from "swr";
import { localClient } from "@/lib/localClient";

type Props = {
  /** 削除の確認ダイアログを閉じるハンドラー */
  onOpenDelete: () => void;
  /** 保存の確認ダイアログを開くハンドラー */
  onOpenSave: () => void;
};
/**
 * タグ編集ダイアログのタグ一覧のリストのロジック
 */
export const TagListLogic = ({ onOpenDelete, onOpenSave }: Props) => {
  const [editTargetId, setEditTargetId] = useState<number | null>(null); // null=選択なし
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null); // null=選択なし
  const saveDataRef = useRef<SubmitTagData | null>(null);
  const isEditTargetId = useCallback(
    (id: number) => editTargetId === id,
    [editTargetId]
  );
  const setEditTarget = useCallback((id: number) => setEditTargetId(id), []);
  const clearEditTarget = useCallback(() => setEditTargetId(null), []);

  const handleDelete = useCallback(async (id: number) => {
    await localClient.work_log.tags._id(id).delete();
    // データを際検証
    mutate("api/work-log/tags/with-usage");
    mutate("api/work-log/tags");
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
  const onSave = useCallback(async () => {
    if (saveDataRef.current && editTargetId) {
      // refから保存データを取得
      const { tagName } = saveDataRef.current;
      // 更新処理
      await localClient.work_log.tags
        ._id(editTargetId)
        .patch({ body: { name: tagName } });
      // 再検証
      mutate("api/work-log/tags/with-usage");
      mutate("api/work-log/tags");
      // 更新後、編集状態を終了
      clearEditTarget();
      // refも初期化
      saveDataRef.current = null;
    }
  }, [clearEditTarget, editTargetId]);

  const onSubmit = useCallback(
    async (data: SubmitTagData, isUsed: boolean) => {
      // 保存データのrefに保存
      saveDataRef.current = data;
      // 使用中であればダイアログを開く
      if (isUsed) {
        onOpenSave();
      } else {
        // 使用中でなければそのまま保存処理
        await onSave();
      }
    },
    [onOpenSave, onSave]
  );
  return {
    /** 編集対象のid(ダイアログで利用) */
    editTargetId,
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
    /** タグの変更を保存するハンドラー */
    onSave,
    /** (タグ名変更時の)送信時のハンドラー */
    onSubmit,
  };
};
