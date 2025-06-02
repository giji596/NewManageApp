import { useCallback } from "react";

type Props = {
  /** ダイアログを閉じるハンドラー */
  onClose: () => void;
  /** 削除ハンドラー */
  onDelete: () => Promise<void>;
};

/**
 * メモ削除確認ダイアログのロジック
 */
export const ConfirmDeleteIncludeMemosDialogLogic = ({
  onClose,
  onDelete,
}: Props) => {
  const onClickDelete = useCallback(async () => {
    await onDelete();
    onClose();
  }, [onClose, onDelete]);

  return {
    /** 削除ハンドラー(削除して閉じる) */
    onClickDelete,
  };
};
