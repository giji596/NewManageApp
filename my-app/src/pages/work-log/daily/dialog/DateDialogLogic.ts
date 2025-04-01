import { useCallback, useState } from "react";

/**
 * 日付ダイアログコンポーネントのロジック
 */
export default function DataDialogLogic() {
  const [open, setOpen] = useState<boolean>(false);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);
  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  return {
    /** 開閉状態 */
    open,
    /**　ダイアログを閉じるハンドラー */
    onClose,
    /** ダイアログを開くハンドラー */
    onOpen,
  };
}
