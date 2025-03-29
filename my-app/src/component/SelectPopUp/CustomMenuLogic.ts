import { useCallback, useRef, useState } from "react";

// ローカル変数
const timeOutSec = 500;

/**
 * 選択賜を含むポップアップのコンポーネントのロジック部分
 */
export default function CustomMenuLogic() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const timeoutId = useRef<NodeJS.Timeout | null>(null); // useRefでタイマーを管理
  const open = Boolean(anchorEl);

  // ローカル関数-----------------------------

  // 一定時間後にメニューを閉じる関数
  const closeAfterTimeout = useCallback(() => {
    timeoutId.current = setTimeout(() => {
      setAnchorEl(null);
    }, timeOutSec);
  }, []);

  // 一定時間後にメニューを開く関数
  const openAfterTimeout = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      timeoutId.current = setTimeout(() => {
        setAnchorEl(event.currentTarget);
      }, timeOutSec);
    },
    []
  );
  // メニューの開閉のタイマーを初期化する関数
  const clearTimeoutTimer = useCallback(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current); // タイマーをキャンセル
      timeoutId.current = null;
    }
  }, []);

  // ---------------------------------------

  // マウスが侵入した際の動作
  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    // メニューの開閉状態に応じて処理を分岐
    // すでにメニューが開いている場合
    // メニューを閉じるタイマーを初期化する(再度、マウスが離れた場合に閉じるためのタイマーを一から数えるために)
    if (open) {
      clearTimeoutTimer();
      // メニューが開いていない場合
      // 一定時間後にメニューを開く
    } else {
      openAfterTimeout(event);
    }
  };

  // マウスが離れた際の処理
  const handleMouseLeave = () => {
    // メニューの開閉状態に応じて処理を分岐
    // メニューが開いている場合
    // 一定時間後にメニューを閉じる
    if (open) {
      closeAfterTimeout();
      // メニューが開いていない場合
      // メニューを開くカウントダウンを初期化する
    } else {
      clearTimeoutTimer();
    }
  };

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return {
    // 開閉状態
    open,
    // 開いている場合の位置情報(null=閉じた状態)
    anchorEl,
    /** メニューを閉じる関数 */
    handleClose,
    /**
     *  マウスが重なった際の関数
     * メニューが開いた状態　=>閉じるためのタイマーを停止させる
     * メニューが閉じた状態 => 一定時間後にメニューを開く
     */
    handleMouseEnter,
    /**
     * マウスが離れた際の関数
     * メニューが開いた状態=> 一定時間後にメニューを閉じる
     * メニューが閉じた状態 => 開くためのタイマーを停止させる
     */
    handleMouseLeave,
  };
}
