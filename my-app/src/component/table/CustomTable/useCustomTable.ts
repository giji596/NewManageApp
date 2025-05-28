import { useCallback, useEffect, useMemo, useState } from "react";
import { ColumnConfig } from "./CustomTable";
import useTableSort from "@/hook/useTableSort";
import { TableSortTargetType } from "@/type/Table";
import { SxProps, Theme } from "@mui/material";
import { getValueByNestedKey, NestedKeys } from "@/lib/table";

type Props<T> = {
  /** データ一覧 */
  data: T[];
  /** 各行の構成 */
  columns: ColumnConfig<T>[];
  /** デフォルトのソート対象 */
  initialTarget?: string;
};
/**
 * カスタムテーブルのロジック
 */
export const useCustomTable = <T extends object>({
  data,
  columns,
  initialTarget,
}: Props<T>) => {
  // UI関連
  const bodyStyle = useMemo(
    () => ({
      textAlign: "center",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    }),
    []
  );
  const headerStyle = useCallback((col: ColumnConfig<T>): SxProps<Theme> => {
    const style: SxProps<Theme> = {
      textAlign: "center",
      pl:
        col.labelProp === "sortable" ||
        col.labelProp === "sortableAndFilterable"
          ? 4
          : 2,
      py: 1.5,
    };

    if (col.width !== undefined) {
      style.width = col.width;
    }

    return style;
  }, []);
  const getSortTarget = useCallback(
    (
      a: T,
      b: T,
      target: string | null
    ): { c: TableSortTargetType; d: TableSortTargetType } => {
      if (target === null) return { c: null, d: null };
      const key = columns.find((col) => col.title === target)?.key;
      if (key === undefined) {
        throw new Error(`target(${target}) is not found in columns`);
      }
      const c = getValueByNestedKey(a, key);
      const d = getValueByNestedKey(b, key);
      if (
        (typeof c === "string" && typeof d === "string") ||
        (typeof c === "number" && typeof d === "number") ||
        (c instanceof Date && d instanceof Date)
      ) {
        return { c, d };
      }
      throw new Error();
    },
    [columns]
  );
  // ソート関連
  const {
    isAsc,
    isSelected,
    handleClickSortLabel,
    doSort,
    isFavoriteChecked,
    toggleFavoriteCheck,
  } = useTableSort({
    initialTarget: initialTarget ?? null,
    getSortTarget,
  });
  /** フィルターリストの初期値
   * - filterList[key][value]=false
   */
  const initialFilterList = useMemo(() => {
    const filterList: Record<string, Record<string, boolean>> = {};
    console.log("初期値メモ化");

    columns.forEach((col) => {
      if (col.labelProp === "sortableAndFilterable") {
        const key = col.key as string;

        const values = data.map((row) => getValueByNestedKey(row, col.key));
        const uniqueValues = Array.from(new Set(values));

        filterList[key] = {};
        uniqueValues.forEach((val) => {
          if (val !== undefined && val !== null) {
            filterList[key][String(val)] = false;
          }
        });
      }
    });
    return filterList;
  }, [columns, data]);

  const [filterList, setFilterList] =
    useState<Record<string, Record<string, boolean>>>(initialFilterList);
  useEffect(() => {
    setFilterList(initialFilterList);
  }, [initialFilterList]);

  // フィルターリストのチェックのOnOffを切り替える関数
  const toggleFilterCheckBox = useCallback(
    (key: string, name: string) => {
      const newValue = !filterList[key][name];
      setFilterList((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          [name]: newValue,
        },
      }));
    },
    [filterList]
  );
  // 選択されている内容に応じてフィルターする関数
  const doFilterByFilterList = useCallback(
    (key: string, value: string): boolean => {
      // フィルターがセットされていない場合、trueを返してフィルターしない
      const isNoFilterSet = Object.values(filterList[key]).every(
        (isChecked) => !isChecked
      );
      if (isNoFilterSet) {
        return true;
      }
      // フィルターが存在する場合にカット対象か検証して、対象であれば早期にfalseでreturnする
      const isFilteredOut = !filterList[key][value];
      return !isFilteredOut;
    },
    [filterList]
  );

  const doFilter = useCallback(
    (item: T): boolean => {
      // 最初はtrueで
      let isFiltered = true;
      // 各key(name,categoryなど)で検証
      Object.entries(filterList).forEach(([key]) => {
        // valueを取得(item.name など)
        const value = getValueByNestedKey(item, key as NestedKeys<T>);
        // nullチェック
        if (value !== undefined && value !== null) {
          const name = String(value);
          // valueがフィルターリストに含まれているかチェック
          isFiltered = isFiltered && doFilterByFilterList(key, name);
        }
      });
      return isFiltered;
    },
    [filterList, doFilterByFilterList]
  );

  return {
    /** ボディ部分のスタイル */
    bodyStyle,
    /** ヘッダー部分のスタイル */
    headerStyle,
    /** ソートが昇順か降順か */
    isAsc,
    /** ソート対象に選択されているかどうかを調べる */
    isSelected,
    /** ソートラベルをクリックした際のハンドラー */
    handleClickSortLabel,
    /** ソートする関数 */
    doSort,
    /** フィルターリスト */
    filterList,
    /** フィルターリストのチェックを切り替える関数 */
    toggleFilterCheckBox,
    /** フィルターする関数 */
    doFilter,
    /** お気に入りのソートのチェック */
    isFavoriteChecked,
    /** お気に入りのソートを切り替えるハンドラー */
    toggleFavoriteCheck,
  };
};
