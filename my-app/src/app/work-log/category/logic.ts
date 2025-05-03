import { SelectChangeEvent } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

/**
 * カテゴリページのロジック
 */
export default function CategoryPageLogic() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedId = Number(searchParams.get("id") ?? 1);
  const onChangeSelectedId = useCallback(
    (e: SelectChangeEvent) => {
      const newId = e.target.value;
      const param = new URLSearchParams();
      param.set("id", newId);
      router.replace(`?${param}`);
    },
    [router]
  );
  return {
    /** 選択中のid */
    selectedId,
    /** 選択中のidを変更する関数 */
    onChangeSelectedId,
  };
}
