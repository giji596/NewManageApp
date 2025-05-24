import { exportDatabase, importDatabase } from "@/lib/dexie";
import { useCallback, useRef, useState } from "react";
import { mutate } from "swr";

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
    // ファイル選択のinputのクリックイベントを発火させる
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // インポートしたファイルを確認
    const file = e.target.files?.[0];
    // ファイルが指定されてない場合は何もしない
    if (!file) return;
    // ファイルの内容を読み込む
    const text = await file.text();
    const json = JSON.parse(text);
    // インポート処理をここで呼ぶ
    await importDatabase(json);
    // 全てのキャッシュをundefinedにする(再取得させる)
    mutate(() => true, undefined);
    // 処理後、ドロワーを閉じる
    onClose();
  };
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
    /** インポートクリック時のハンドラー(inputのクリックイベントを渡してドロワーを閉じる) */
    onClickImport,
    /** インポート対象が設定された際のハンドラー(IndexedDB内のデータを置換)  */
    handleFileChange,
    /** エクスポート時のハンドラー */
    onClickExport,
    /** テーマ変更時のハンドラー */
    onClickTheme,
  };
};
