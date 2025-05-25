import { useCallback } from "react";

type Props = {
  /** ダイアログ閉じる関数 */
  onClose: () => void;
  /** インポート時の関数 */
  onImport: () => Promise<void>;
};
/**
 * インポート時の上書きの確認ダイアログのロジック
 */
export const ImportOverwriteDialogLogic = ({ onClose, onImport }: Props) => {
  const onClickImport = useCallback(async () => {
    await onImport();
    onClose();
  }, [onImport, onClose]);
  return {
    /** インポートクリック時のハンドラー */
    onClickImport,
  };
};
