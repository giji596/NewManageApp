import apiClient from "@/lib/apiClient";
import useAspidaSWR from "@aspida/swr";
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

  const { data: rawData } = useAspidaSWR(
    apiClient.work_log.tags.with_usage,
    "get",
    { key: "api/work-log/tags/with-usage" }
  );
  const tagList = useMemo(() => {
    const data = rawData?.body;
    // 未使用のみ表示であればisUsed=falseのもののみ表示
    if (showOnlyUnused && data) {
      return data.filter((v) => !v.isUsed);
    }
    return data;
  }, [rawData?.body, showOnlyUnused]);

  return {
    /** 未使用のみ表示するかの設定 */
    showOnlyUnused,
    /** 未使用のみ表示するかの設定の切り替え */
    toggleShowOnlyUnused,
    /** タグの一覧 */
    tagList,
  };
};
