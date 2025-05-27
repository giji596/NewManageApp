import { MemoTaskDetail } from "@/type/Memo";
import {} from "@/type/Table";
import { useCallback, useRef, useState } from "react";

type Props = {
  /** 編集ダイアログを開くハンドラー */
  onOpen: () => void;
  /** 編集ダイアログを閉じるハンドラー */
  onClose: () => void;
};

/**
 * タスク詳細　メモリストのコンポーネント
 */
export default function MemoList({ onOpen, onClose }: Props) {
  const [activeRowId, setActiveRowId] = useState<number | null>(null);
  const handleClickRow = useCallback((id: number) => {
    setActiveRowId((prev) => {
      if (prev === id) return null; // 選択済みならnullを返して選択を解除
      return id; // それ以外は新たなidをセットさせる
    });
  }, []);

  // 編集ダイアログ関連
  // 編集対象のデータをrefで保持
  const editTargetRef = useRef<MemoTaskDetail | null>(null);

  const onOpenEditDialog = useCallback(
    (data: MemoTaskDetail) => {
      editTargetRef.current = data; // 編集対象のデータを保持
      onOpen();
    },
    [onOpen]
  );
  const onCloseEditDialog = useCallback(() => {
    editTargetRef.current = null; // 編集対象のデータをクリア
    onClose();
  }, [onClose]);

  return {
    /** 行をクリックした際のハンドラー(アクティブな行の設定/解除) */
    handleClickRow,
    /** 編集対象のデータ */
    editTargetRef,
    /** 編集ダイアログを開くハンドラー */
    onOpenEditDialog,
    /** 編集ダイアログを閉じるハンドラー */
    onCloseEditDialog,
  };
}
