import { useCallback, useState } from "react";

/**
 * テーブルのソートロジックのカスタムフック
 */
export default function useTableSort() {
  const [isAsc, setIsAsc] = useState<boolean>(true);
  const [targetTitle, setTargetTitle] = useState<string>();

  // タイトルが選択状態かどうかを調べる関数
  const isSelected = useCallback(
    (title: string) => targetTitle === title,
    [targetTitle]
  );

  // ソート対象をセットする関数
  const handleSetSortTarget = useCallback(
    (title: string): void => {
      // 選択中の場合:ascとdescを入れ替える
      if (isSelected(title)) {
        setIsAsc(!isAsc);
      } else {
        setTargetTitle(title);
        setIsAsc(true);
      }
    },
    [isAsc, isSelected]
  );

  // ソート関数
  const doSortByTitle = useCallback(() => {}, []); // TODO:根本的に再利用できるように修正するので、0から作る
  return {
    /** ソートが昇順か降順か */
    isAsc,
    /** ソート対象に選択されているかどうかを調べる */
    isSelected,
    /** ソート対象に選択するハンドラー */
    handleSetSortTarget,
    /** ソートする関数 */
    doSortByTitle,
  };
}
