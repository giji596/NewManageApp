import { useCallback, useEffect, useMemo, useState } from "react";
import { ColumnConfig } from "./CustomTable";

type Props<T> = {
  /** データ一覧 */
  data: T[];
  /** 各行の構成 */
  columns: ColumnConfig<T>[];
};
/**
 * カスタムテーブルのロジック
 */
export const useCustomTable = <T>({ data, columns }: Props<T>) => {
  /** フィルターリストの初期値
   * - filterList[key][value]=false
   */
  const initialFilterList = useMemo(() => {
    const filterList: Record<string, Record<string, boolean>> = {};

    columns.forEach((col) => {
      if (col.labelProp === "sortableAndFilterable") {
        const key = col.key as string;

        const values = data.map((row) => row[col.key]);
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
        const value = item[key as keyof T];
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
    /** フィルターリスト */
    filterList,
    /** フィルターリストのチェックを切り替える関数 */
    toggleFilterCheckBox,
    /** フィルターする関数 */
    doFilter,
  };
};
