import { TableSortTargetType } from "@/type/Table";
import { useCallback, useState } from "react";

type Props<T> = {
  /** 初期選択項目 */
  initialTarget: string | null;
  /** ソート対象を取得する関数 */
  getSortTarget: (
    a: T,
    b: T,
    target: string | null
  ) => { c: TableSortTargetType; d: TableSortTargetType };
};

/**
 * テーブルのソートロジックのカスタムフック T=ソート対象のタイプ
 */
export default function useTableSort<T extends object>({
  initialTarget,
  getSortTarget,
}: Props<T>) {
  const [isAsc, setIsAsc] = useState<boolean>(true);
  const [target, setTarget] = useState<string | null>(initialTarget);
  const [isFavoriteChecked, setIsFavoriteChecked] = useState<boolean>(false);
  const toggleFavoriteCheck = useCallback(
    () => setIsFavoriteChecked((prev) => !prev),
    []
  );
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
        setIsAsc(true);
      }
    },
    [isAsc, isSelected]
  );

  // ラベル状況に応じてソートする関数
  const sortByLabel = useCallback(
    (c: TableSortTargetType, d: TableSortTargetType) => {
      // nullチェックを最初に行う（isAscなら
      if (c === null && d === null) return 0;
      if (c === null) return isAsc ? 1 : -1;
      if (d === null) return isAsc ? -1 : 1;
      switch (typeof c) {
        // 各タイプの同定を行ったのちにソートする
        case "string":
          if (typeof c === "string" && typeof d == "string")
            return isAsc ? c.localeCompare(d) : d.localeCompare(c);
        case "number":
          if (typeof c === "number" && typeof d == "number")
            return isAsc ? d - c : c - d;
        case "object":
          if (c instanceof Date && d instanceof Date)
            return isAsc
              ? d.getTime() - c.getTime()
              : c.getTime() - d.getTime();
        // デフォで0を与える =>sortメソッドで0は「何もしない」(引数絞ってるので、基本的にはここまでいかないはず)
        default:
          return 0;
      }
    },
    [isAsc]
  );

  // お気に入りに応じてソートする関数
  const sortByFavorite = useCallback((a: T, b: T): number => {
    // パラメータあるかをチェックしとく
    if ("isFavorite" in a && "isFavorite" in b) {
      // 前後でisFavoriteが違う場合のみソート(通常のソートと併用しつつ、isFavoriteを優先させるため)
      if (a.isFavorite !== b.isFavorite) {
        // Numberにするとfalse:0,true:1 -> returnの値は1,-1となってソート可能
        return Number(b.isFavorite) - Number(a.isFavorite);
      }
    }
    // ソートしない場合(isFavoriteが前後で同じ or (例外処理)パラメータがない場合)
    return 0;
  }, []);

  // ソート関数
  const doSort = useCallback(
    (a: T, b: T) => {
      const { c, d } = getSortTarget(a, b, target);
      // お気に入りのチェックがOffであれば普通にラベルだけでソートする
      if (!isFavoriteChecked) {
        return sortByLabel(c, d);
        // お気に入りのチェックがOnである場合
      } else {
        const favoriteDiff = sortByFavorite(a, b);
        // favoriteDiff===0の場合(両方お気に入りorそうでない場合)は普通のソートに従ってソート
        if (favoriteDiff === 0) {
          return sortByLabel(c, d);
        }
        // favoriteDiff!==0の場合 お気に入りを優先させる
        return favoriteDiff;
      }
    },
    [getSortTarget, isFavoriteChecked, sortByFavorite, sortByLabel, target]
  );
  return {
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
    /** お気に入りのソートのチェック */
    isFavoriteChecked,
    /** お気に入りのソートを切り替えるハンドラー */
    toggleFavoriteCheck,
  };
}
