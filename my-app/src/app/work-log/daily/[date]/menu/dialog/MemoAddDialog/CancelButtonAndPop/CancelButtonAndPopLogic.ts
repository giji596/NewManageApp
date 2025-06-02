import { useCallback, useState } from "react";
import { useMemo } from "react";

type Props = {
  /** 入力中の内容の有無 */
  isInput: boolean;
  /** キャンセル時のハンドラー */
  onCancel: () => void;
};

/**
 * キャンセルボタンと破棄の確認ポップオーバーのロジック
 */
export const CancelButtonAndPopLogic = ({ isInput, onCancel }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      // 入力中の内容があればメニューを開く
      if (isInput) {
        setAnchorEl(event.currentTarget);
      } else {
        // 入力中の内容がなければ直接キャンセル時の処理
        onCancel();
      }
    },
    [isInput, onCancel]
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const open = useMemo(() => Boolean(anchorEl), [anchorEl]);
  const id = useMemo(() => (open ? "simple-popover" : undefined), [open]);

  const onAccept = useCallback(() => {
    onCancel();
    handleClose();
  }, [onCancel, handleClose]);

  return {
    /** ポップオーバーを表示するためのアンカー要素 */
    anchorEl,
    /** ポップオーバーを表示するためのハンドラ */
    handleClick,
    /** ポップオーバーを閉じるためのハンドラ */
    handleClose,
    /** ポップオーバーが開いているかどうかのフラグ */
    open,
    /** ポップオーバーのID */
    id,
    /** ポップオーバーのok押した際のハンドラー(キャンセル処理してポップ閉じる) */
    onAccept,
  };
};
