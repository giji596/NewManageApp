import { useCallback, useState } from "react";

/**
 * データ管理/表示設定を表示するドロワー + それを開閉するボタンのロジック
 */
export const SettingsDrawerLogic = () => {
  // ドロワーの開閉関連
  const [open, setOpen] = useState<boolean>(false);

  const onOpen = useCallback(() => setOpen(true), []);
  const onClose = useCallback(() => setOpen(false), []);
  return {
    /** ドロワーの開閉状態 */
    open,
    /** ドロワー展開するハンドラー */
    onOpen,
    /** ドロワー閉じるハンドラー */
    onClose,
  };
};
