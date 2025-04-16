import { CategoryOption } from "@/type/Category";

/**
 * カテゴリページのカテゴリ選択部分のロジック
 */
export default function CategorySelectLogic() {
  // TODO:データフェッチさせる

  const categoryOptions: CategoryOption[] = [
    { id: 1, name: "カテゴリ1" },
    { id: 2, name: "カテゴリ2" },
    { id: 3, name: "カテゴリ3" },
    { id: 4, name: "カテゴリ4" },
  ];
  return {
    /** カテゴリの選択賜一覧 */
    categoryOptions,
  };
}
