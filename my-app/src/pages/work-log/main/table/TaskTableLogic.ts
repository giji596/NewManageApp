import { MainPageTaskTable } from "@/type/Task";
import { useCallback } from "react";

/**
 * メインページのタスクテーブルコンポーネントのロジック
 */
export default function TaskTableLogic() {
  // TODO:実際はデータフェッチさせる
  const data: MainPageTaskTable[] = [
    { id: 1, name: "タスク1", progress: "80%" },
    { id: 2, name: "タスク2", progress: "80%" },
    { id: 3, name: "タスク3", progress: "70%" },
    { id: 4, name: "タスク4", progress: "65%" },
    { id: 5, name: "タスク5", progress: "20%" },
  ];

  const navigateToDetail = useCallback((id: number) => {
    // TODO: ページ移動のハンドラ追加
    console.log("タスク詳細ページへ id:", id);
  }, []);
  return {
    /** 表示するデータ */
    data,
    /** タスク詳細ページへ飛ぶハンドラー */
    navigateToDetail,
  };
}
