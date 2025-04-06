import { TableSortTargetType } from "@/type/Table";
import { useCallback, useState } from "react";

type Props = {
  /** 初期選択項目 */
  initialTarget: string;
};

/**
 * テーブルのソートロジックのカスタムフック
 * 注意点:ソート対象については個別にロジックで用意する必要あり(タイトル名からSwitch文でオブジェクトの値を変換するのを推奨)
 */
export default function useTableSort({ initialTarget }: Props) {
  const [isAsc, setIsAsc] = useState<boolean>(true);
  const [target, setTarget] = useState<string | null>(() => initialTarget);

  // タイトルが選択状態かどうかを調べる関数
  const isSelected = useCallback((title: string) => target === title, [target]);

  // ソートラベルをクリックした際のハンドラー
  const handleClickSortLabel = useCallback(
    (title: string): void => {
      // 選択中の場合:ascとdescを入れ替える
      if (isSelected(title)) {
        setIsAsc(!isAsc);
      } else {
        // 非選択の場合:新たなターゲットをセットする
        setTarget(title);
      }
      setIsAsc(true);
    },
    [isAsc, isSelected]
  );

  // ソート関数
  const doSort = useCallback(
    (a: TableSortTargetType, b: TableSortTargetType) => {
      switch (typeof a) {
        // 各タイプの同定を行ったのちにソートする
        case "string":
          if (typeof a === "string" && typeof b == "string")
            return isAsc ? a.localeCompare(b) : b.localeCompare(a);
        case "number":
          if (typeof a === "number" && typeof b == "number")
            return isAsc ? a - b : b - a;
        case "object":
          if (a instanceof Date && b instanceof Date)
            return isAsc
              ? a.getTime() - b.getTime()
              : b.getTime() - a.getTime();
        // デフォで0を与える =>sortメソッドで0は「何もしない」(引数絞ってるので、基本的にはここまでいかないはず)
        default:
          return 0;
      }
    },
    [isAsc]
  );
  return {
    /** 現在のソート対象に選択されている値の名称 */
    target,
    /** ソートが昇順か降順か */
    isAsc,
    /** ソート対象に選択されているかどうかを調べる */
    isSelected,
    /** ソートラベルをクリックした際のハンドラー
     * @param ラベルタイトル名
     * @return void( 選択中のラベルであれば昇順/降順を切り替える 非選択であればtargetにセットしつつ、昇順にする)
     */
    handleClickSortLabel,
    /** ソートする関数
     * @param ソート対象(string | number | Date型 のいずれか対応) 適宜必要であればこの関数に追記
     * @return Array.sortメソッドに準拠したnumber
     */
    doSort,
  };
}
