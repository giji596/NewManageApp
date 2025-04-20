import { useCallback, useRef, useState } from "react";

// ローカル変数
const timeOutSec = 500;

/**
 * 選択賜を含むポップアップのコンポーネントのロジック部分
 */
export default function CustomMenuWrapperLogic() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const timeoutIds = useRef<Map<number, NodeJS.Timeout | null>>(new Map());
  const openTargetIdRef = useRef<number>(99999);
  const open = Boolean(anchorEl);

  // ローカル関数-----------------------------

  // 一定時間後にメニューを閉じる関数
  const closeAfterTimeout = useCallback((id: number) => {
    // タイムアウト処理を作成
    const newTimeout = setTimeout(() => {
      setAnchorEl(null);
      openTargetIdRef.current = 99999;
    }, timeOutSec);
    // 処理をtimeoutIdsに登録
    timeoutIds.current.set(id, newTimeout);
  }, []);

  // 一定時間後にメニューを開く関数
  const openAfterTimeout = useCallback((id: number, target: HTMLElement) => {
    // タイムアウト処理を作成
    const newTimeout = setTimeout(() => {
      setAnchorEl(target);
      openTargetIdRef.current = id;
    }, timeOutSec);
    // 処理をtimeoutIdsに登録
    timeoutIds.current.set(id, newTimeout);
  }, []);
  // メニューの開閉のタイマーを初期化する関数
  const clearTimeoutTimer = useCallback((id: number) => {
    const currentId = timeoutIds.current.get(id);
    console.log(timeoutIds);
    if (currentId) {
      clearTimeout(currentId); // タイマーをキャンセル
    }
    timeoutIds.current.delete(id); // Mapから該当idのデータを削除
  }, []);

  // ---------------------------------------

  // マウスが侵入した際の動作
  const handleMouseEnter = (
    id: number,
    event: React.MouseEvent<HTMLElement>
  ) => {
    // 開いているメニューid===openTargetIdRef.currentであればメニューを閉じるタイマーを初期化する
    if (id === openTargetIdRef.current) {
      clearTimeoutTimer(id);
      // メニューが開いていない場合
      // 一定時間後にメニューを開く
    } else {
      openAfterTimeout(id, event.currentTarget);
    }
  };

  // マウスが離れた際の処理
  const handleMouseLeave = (id: number) => {
    // 開いているメニューid===openTargetIdRef.currentであればメニューを閉じる
    if (id === openTargetIdRef.current) {
      closeAfterTimeout(id);
      // メニューが開いていない場合
      // メニューを開くカウントダウンを初期化する
    } else {
      clearTimeoutTimer(id);
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
    /** 開いている対象のIDのリファレンス */
    openTargetIdRef,
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
