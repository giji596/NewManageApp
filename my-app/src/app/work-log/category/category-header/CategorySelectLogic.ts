import apiClient from "@/lib/apiClient";
import { CategoryOption } from "@/type/Category";
import useAspidaSWR from "@aspida/swr";
import { SelectChangeEvent } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

/**
 * カテゴリページのカテゴリ選択部分のロジック
 */
export default function CategorySelectLogic() {
  const { data } = useAspidaSWR(apiClient.work_log.categories.options, "get", {
    key: "api/work-log/categories/options",
  });
  const categoryOptions: CategoryOption[] = data?.body ?? [];

  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedCategoryId = Number(searchParams.get("id") ?? 1);
  const onChangeCategoryId = useCallback(
    (e: SelectChangeEvent) => {
      const newId = e.target.value;
      const param = new URLSearchParams();
      param.set("id", newId);
      router.replace(`?${param}`);
    },
    [router]
  );
  return {
    /** カテゴリの選択賜一覧 */
    categoryOptions,
    /** 選択中のカテゴリid */
    selectedCategoryId,
    /** 選択中のカテゴリを変更する関数 */
    onChangeCategoryId,
  };
}
