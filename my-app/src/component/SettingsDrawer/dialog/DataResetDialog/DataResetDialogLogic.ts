import { clearAllTables } from "@/lib/dexie";
import { useCallback } from "react";
import { mutate } from "swr";

type Props = {
  /** ダイアログ閉じるハンドラー */
  onClose: () => void;
};

/**
 * データリセット時に表示するダイアログのロジック
 */
export const DataResetDialogLogic = ({ onClose }: Props) => {
  const onClickDelete = useCallback(async () => {
    // クリアー処理
    await clearAllTables();
    // 全てのキャッシュを削除して再検証
    mutate(() => true, undefined);
    onClose();
  }, [onClose]);

  return {
    /** 削除クリック時のハンドラー */
    onClickDelete,
  };
};
