import { SelectChangeEvent } from "@mui/material";
import { useCallback, useState } from "react";

/**
 * カテゴリページのロジック
 */
export default function CategoryPageLogic() {
  // TODO:ここでidを取得 クエリから取得(クエリなければ1を受け取ればよさそう？)
  const initialId = 1;
  const [selectedId, setSelectedId] = useState<number>(initialId);
  const onChangeSelectedId = useCallback((e: SelectChangeEvent) => {
    const newId = Number(e.target.value);
    setSelectedId(newId);
  }, []);
  return {
    /** 選択中のid */
    selectedId,
    /** 選択中のidを変更する関数 */
    onChangeSelectedId,
  };
}
