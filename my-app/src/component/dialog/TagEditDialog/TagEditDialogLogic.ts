import { dummyTagEditListItems } from "@/dummy/memo-tag";
import { useCallback, useMemo, useState } from "react";

/**
 * タグを編集するダイアログのロジック
 */
export const TagEditDialogLogic = () => {
  // 表示設定
  const [showOnlyUnused, setShowOnlyUnused] = useState<boolean>(false);
  const toggleShowOnlyUnused = useCallback(
    () => setShowOnlyUnused((prev) => !prev),
    []
  );

  // TODO: でーたふぇっちする
  const tagList = useMemo(() => {
    const data = dummyTagEditListItems;
    // 未使用のみ表示であればisUsed=falseのもののみ表示
    if (showOnlyUnused) {
      return data.filter((v) => !v.isUsed);
    }
    return data;
  }, [showOnlyUnused]);

  return {
    /** 未使用のみ表示するかの設定 */
    showOnlyUnused,
    /** 未使用のみ表示するかの設定の切り替え */
    toggleShowOnlyUnused,
    /** タグの一覧 */
    tagList,
  };
};
