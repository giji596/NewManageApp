import { useCallback } from "react";

type Props = {
  /** ダイアログを閉じるハンドラー */
  onClose: () => void;
  /** 削除のハンドラー */
  onDelete: () => Promise<void>;
};

/**
 * タグの削除時の確認ダイアログのロジック
 */
export const TagConfirmDeleteDialogLogic = ({ onClose, onDelete }: Props) => {
  const memoTitleList = ["メモ1", "メモ2", "メモ3", "メモ4", "メモ5"]; // TODO: 実際はフェッチ 0~5件取ってくる
  const usedCount = 8; // TODO:実際はフェッチ ここで利用されている箇所の数を取得する
  const hideItemCount = usedCount - 5;

  const onClickDelete = useCallback(async () => {
    // 削除リクエスト
    await onDelete();
    // TODO:ここで再検証
    // 再検証後に閉じる
    onClose();
  }, [onClose, onDelete]);

  return {
    /** タグを使ってるメモタイトル一覧(0~5件まで) */
    memoTitleList,
    /** 非表示になってるアイテムの数(他x件で表示) */
    hideItemCount,
    /** 削除クリック時のハンドラー */
    onClickDelete,
  };
};
