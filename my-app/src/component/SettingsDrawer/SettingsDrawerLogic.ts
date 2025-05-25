import {
  exportDatabase,
  ImportData,
  importDatabase,
  isDatabaseExist,
} from "@/lib/dexie";
import { useCallback, useRef, useState } from "react";
import { mutate } from "swr";

type Props = {
  /** テーマ変更関数 */
  onChangeTheme: () => void;
  /** 上書き確認ダイアログの開くロジック */
  onOpenOverWrite: () => void;
};

/**
 * データ管理/表示設定を表示するドロワー + それを開閉するボタンのロジック
 */
export const SettingsDrawerLogic = ({
  onChangeTheme,
  onOpenOverWrite,
}: Props) => {
  // ドロワーの開閉関連
  const [open, setOpen] = useState<boolean>(false);

  const onOpen = useCallback(() => setOpen(true), []);
  const onClose = useCallback(() => setOpen(false), []);

  // 各項目
  // データ管理関連
  // インポート対象のデータ
  const importData = useRef<ImportData | null>(null);
  // refを使ってファイルを選択する
  const fileInputRef = useRef<HTMLInputElement>(null);
  const onClickImport = useCallback(() => {
    // ファイル選択のinputのクリックイベントを発火させる
    fileInputRef.current?.click();
  }, []);

  // インポート関数
  const onImport = useCallback(async () => {
    if (importData.current !== null) {
      // インポート処理
      await importDatabase(importData.current);
      // 全てのキャッシュをundefinedにする(再取得させる)
      await mutate(() => true, undefined);
      // importDataをnullにする
      importData.current = null;
      // 処理後、ドロワーを閉じる
      onClose();
    }
  }, [onClose]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // インポートしたファイルを確認
    const file = e.target.files?.[0];
    // ファイルが指定されてない場合は何もしない
    if (!file) return;
    // ファイルの内容を読み込む
    const text = await file.text();
    const json = JSON.parse(text) as ImportData; // dbから取るので型は同定可能
    // インポートデータとして保持
    importData.current = json;
    // dbにデータがあるかチェック
    const exist = await isDatabaseExist();
    // データがある場合
    if (exist) {
      // 上書き確認ダイアログを開く
      onOpenOverWrite();
    } else {
      // データがない場合は直接インポート処理を呼ぶ
      await onImport();
    }
  };
  const onClickExport = useCallback(() => {
    exportDatabase();
    onClose();
  }, [onClose]);

  // 表示関連
  const onClickTheme = useCallback(() => {
    onChangeTheme();
    onClose();
  }, [onChangeTheme, onClose]);
  return {
    /** ドロワーの開閉状態 */
    open,
    /** ドロワー展開するハンドラー */
    onOpen,
    /** ドロワー閉じるハンドラー */
    onClose,
    /** インポート時のファイル選択のinputのref */
    fileInputRef,
    /** インポート処理(上書き確認ダイアログにロジック受け渡しよう) */
    onImport,
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
