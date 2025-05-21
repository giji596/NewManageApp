import { localClient } from "@/lib/localClient";
import { useCallback, useMemo, useState } from "react";
import useSWR from "swr";

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

  const { data } = useSWR(
    "api/work-log/tags/with-usage",
    localClient.work_log.tags.with_usage.get()
  );
  const tagList = useMemo(() => {
    // 未使用のみ表示であればisUsed=falseのもののみ表示
    if (showOnlyUnused && data) {
      return data.filter((v) => !v.isUsed);
    }
    return data;
  }, [data, showOnlyUnused]);

  return {
    /** 未使用のみ表示するかの設定 */
    showOnlyUnused,
    /** 未使用のみ表示するかの設定の切り替え */
    toggleShowOnlyUnused,
    /** タグの一覧 */
    tagList,
  };
};
