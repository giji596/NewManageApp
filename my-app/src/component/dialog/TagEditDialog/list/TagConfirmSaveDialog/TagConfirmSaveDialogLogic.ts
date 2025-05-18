import { TagUsage } from "@/type/Tag";
import { useCallback } from "react";

type Props = {
  /** 保存対象のid(データ取得に利用) */
  targetId: number;
  /** ダイアログを閉じるハンドラー */
  onClose: () => void;
  /** 保存のリクエスト処理 */
  onSave: () => Promise<void>;
};

/**
 * タグ保存時に表示する確認ダイアログのロジック
 */
export const TagConfirmSaveDialogLogic = ({
  targetId,
  onClose,
  onSave,
}: Props) => {
  console.log("関連めもふぇっち!対象id:", targetId);
  const memoData: TagUsage = {
    memoTitles: ["メモ1", "メモ2", "メモ3", "メモ4", "メモ5"],
    usageCount: 8,
  };
  const memoTitleList = memoData.memoTitles;
  const usedCount = memoData.usageCount;
  const hideItemCount = usedCount - 5;
  const onClickSave = useCallback(async () => {
    await onSave();
    // 保存完了後に閉じる
    onClose();
  }, [onClose, onSave]);
  return {
    /** タグを使ってるメモタイトル一覧(0~5件まで) */
    memoTitleList,
    /** 非表示になってるアイテムの数(他x件で表示) */
    hideItemCount,
    /** 保存押した際のハンドラー(保存処理 -> await -> ダイアログ閉じる) */
    onClickSave,
  };
};
