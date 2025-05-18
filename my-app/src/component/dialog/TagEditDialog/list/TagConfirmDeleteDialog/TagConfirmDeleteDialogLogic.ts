import { TagUsage } from "@/type/Tag";
import { useCallback } from "react";

type Props = {
  /** 削除対象のid(データ取得に利用) */
  targetId: number;
  /** ダイアログを閉じるハンドラー */
  onClose: () => void;
  /** 削除のハンドラー */
  onDelete: () => Promise<void>;
};

/**
 * タグの削除時の確認ダイアログのロジック
 */
export const TagConfirmDeleteDialogLogic = ({
  targetId,
  onClose,
  onDelete,
}: Props) => {
  // TODO:idを用いてフェッチ
  console.log("ふぇっちたーげっと", targetId);
  const memoData: TagUsage = {
    memoTitles: ["メモ1", "メモ2", "メモ3", "メモ4", "メモ5"],
    usageCount: 8,
  };
  const memoTitleList = memoData.memoTitles;
  const usedCount = memoData.usageCount;
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
