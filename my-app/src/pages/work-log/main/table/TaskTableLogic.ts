/**
 * メインページのタスクテーブルコンポーネントのロジック
 */
export default function TaskTableLogic() {
  // TODO:実際はデータフェッチさせる
  const data = [
    { id: 1, name: "タスク1", progress: "80%" },
    { id: 2, name: "タスク2", progress: "80%" },
    { id: 3, name: "タスク3", progress: "70%" },
    { id: 4, name: "タスク4", progress: "65%" },
    { id: 5, name: "タスク5", progress: "20%" },
  ];
  return {
    /** 表示するデータ */
    data,
  };
}
