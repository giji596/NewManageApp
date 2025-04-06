import { useCallback, useState } from "react";

type Props = {
  /** 初期値のフィルターリスト */
  initialFilterList: Record<string, boolean>;
};

/**
 * テーブルのフィルターロジックのカスタムフック
 * @param initialFilterList:Record<string,boolean> key:対象名 value:フィルター対象か　形式の選択対象のリスト(valueは基本的に初期値falseで)
 */
export default function useTableFilter({ initialFilterList }: Props) {
  const [filterList, setFilterList] = useState<Record<string, boolean>>(
    () => initialFilterList
  );

  // フィルターリストのチェックのOnOffを切り替える関数
  const toggleFilterCheckBox = useCallback(
    (name: string) => {
      const newValue = !filterList[name];
      setFilterList((prev) => ({ ...prev, [name]: newValue }));
    },
    [filterList]
  );

  // 選択されている内容に応じてフィルターする関数
  const doFilterByFilterList = useCallback(
    (key: string): boolean => {
      // フィルターがセットされていない場合、trueを返してフィルターしない
      const isNoFilter = Object.values(filterList).every(
        (value) => value === false
      );
      if (isNoFilter) {
        return true;
      }
      // フィルターが存在する場合にカット対象か検証して、対象であれば早期にfalseでreturnする
      if (!isNoFilter) {
        const isCutByCategory = !filterList[key];
        if (isCutByCategory) {
          return false;
        }
      }
      return true;
    },
    [filterList]
  );

  return {
    /** key:string(対象名) value:boolean(フィルター対象かどうか)のRecordオブジェクト */
    filterList,
    /** フィルターリストのチェックボックスを切り替える関数 */
    toggleFilterCheckBox,
    /** フィルターリストに応じてフィルターする関数 */
    doFilterByFilterList,
  };
}
