import { useCallback, useState } from "react";

/**
 * ラジオ選択賜のstringのオブジェクト
 */
const RadioSelectSet = ["昨日", "一昨日", "指定する"] as const;

/**
 * daily-pageのダイアログ用のラジオボタンの型(型安全のため詳しく設定)
 */
type RadioSelect = (typeof RadioSelectSet)[number];

/**
 * 日付ダイアログコンポーネントのロジック
 */
export default function DataDialogLogic() {
  const [open, setOpen] = useState<boolean>(false);
  const [radioSelect, setRadioSelect] = useState<RadioSelect>("昨日");

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);
  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const onChangeRadioSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const target = e.target.value;
      if ((RadioSelectSet as readonly string[]).includes(target)) {
        setRadioSelect(target as RadioSelect);
      } else {
        console.log("ラジオボタンに型定義外の値が与えられとる"); // FIXME:リリース時には削除
      }
    },
    []
  );

  return {
    /** 開閉状態 */
    open,
    /** ラジオボタンの選択中の値 */
    radioSelect,
    /**　ダイアログを閉じるハンドラー */
    onClose,
    /** ダイアログを開くハンドラー */
    onOpen,
    /** ラジオボタンの選択をvalueの値に変更する関数 */
    onChangeRadioSelect,
  };
}
