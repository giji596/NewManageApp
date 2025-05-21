import { localClient } from "@/lib/localClient";
import { useCallback } from "react";
import useSWR from "swr";

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
  const { data: memoData } = useSWR(
    `api/work-log/tags/${targetId}/usage`,
    localClient.work_log.tags._id(targetId).usage.get()
  );
  const memoTitleList = memoData?.memoTitles;
  const usedCount = memoData?.usageCount;
  const hideItemCount = usedCount && usedCount - 5;

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
