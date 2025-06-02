import { useCallback, useState } from "react";
import { useMemo } from "react";

/**
 * キャンセルボタンと破棄の確認ポップオーバーのロジック
 */
export const CancelButtonAndPopLogic = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const open = useMemo(() => Boolean(anchorEl), [anchorEl]);
  const id = useMemo(() => (open ? "simple-popover" : undefined), [open]);

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
  };
};
