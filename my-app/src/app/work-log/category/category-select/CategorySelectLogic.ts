import apiClient from "@/lib/apiClient";
import { CategoryOption } from "@/type/Category";
import useAspidaSWR from "@aspida/swr";

/**
 * カテゴリページのカテゴリ選択部分のロジック
 */
export default function CategorySelectLogic() {
  const { data } = useAspidaSWR(apiClient.work_log.categories.options, "get", {
    key: "api/work-log/categories/options",
  });
  const categoryOptions: CategoryOption[] = data?.body ?? [];
  return {
    /** カテゴリの選択賜一覧 */
    categoryOptions,
  };
}
