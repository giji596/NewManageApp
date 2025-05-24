import { exportDatabase } from "@/lib/dexie";
import { useCallback, useRef, useState } from "react";

/**
 * データ管理/表示設定を表示するドロワー + それを開閉するボタンのロジック
 */
export const SettingsDrawerLogic = () => {
  // ドロワーの開閉関連
  const [open, setOpen] = useState<boolean>(false);

  const onOpen = useCallback(() => setOpen(true), []);
  const onClose = useCallback(() => setOpen(false), []);

  // 各項目
  // データ管理関連
  // refを使ってファイルを選択する
  const fileInputRef = useRef<HTMLInputElement>(null);
  const onClickImport = useCallback(() => {
    // TODO: DB関連の管理ロジック実装後
    fileInputRef.current?.click();
    onClose();
  }, [onClose]);
  const onClickExport = useCallback(() => {
    exportDatabase();
    onClose();
  }, [onClose]);

  // 表示関連
  const onClickTheme = useCallback(() => {
    // TODO:テーマプロパイダーのロジック実装後
    console.log("テーマ切り替え");
    onClose();
  }, [onClose]);
  return {
    /** ドロワーの開閉状態 */
    open,
    /** ドロワー展開するハンドラー */
    onOpen,
    /** ドロワー閉じるハンドラー */
    onClose,
    /** インポート時のファイル選択のinputのref */
    fileInputRef,
    /** インポート時のハンドラー */
    onClickImport,
    /** エクスポート時のハンドラー */
    onClickExport,
    /** テーマ変更時のハンドラー */
    onClickTheme,
  };
};
