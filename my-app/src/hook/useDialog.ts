import { useCallback, useState } from "react";

/**
 * ダイアログの基本構成
 */
export default function useDialog() {
  const [open, setOpen] = useState<boolean>();

  const onClose = useCallback(() => setOpen(false), []);
  const onOpen = useCallback(() => setOpen(true), []);

  return {
    /** ダイアログ開閉状態 */
    open,
    /** ダイアログを閉じる関数 */
    onClose,
    /** ダイアログを開く関数 */
    onOpen,
  };
}
