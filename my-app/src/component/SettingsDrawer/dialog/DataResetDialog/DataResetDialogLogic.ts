import { useCallback } from "react";

type Props = {
  /** ダイアログ閉じるハンドラー */
  onClose: () => void;
};

/**
 * データリセット時に表示するダイアログのロジック
 */
export const DataResetDialogLogic = ({ onClose }: Props) => {
  const onClickDelete = useCallback(async () => {
    // TODO:db管理とか実装してから
    console.log("indexedDBさくじょ");
    onClose();
  }, [onClose]);

  return {
    /** 削除クリック時のハンドラー */
    onClickDelete,
  };
};
