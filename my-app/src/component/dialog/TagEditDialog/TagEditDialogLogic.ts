import { dummyTagEditListItems } from "@/dummy/memo-tag";
import { useMemo } from "react";

/**
 * タグを編集するダイアログのロジック
 */
export const TagEditDialogLogic = () => {
  // TODO: でーたふぇっちする
  const tagList = useMemo(() => dummyTagEditListItems, []);
  return {
    /** タグの一覧 */
    tagList,
  };
};
