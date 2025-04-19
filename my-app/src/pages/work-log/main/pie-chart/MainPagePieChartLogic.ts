/**
 * メインページの円グラフのロジック
 */
export default function MainPagePieChartLogic() {
  // TODO:でーたふぇっちする(整形された状態で)
  const data = [
    {
      name: "カテゴリ1",
      value: 500,
      task: [
        { name: "タスク1", hours: 30 },
        { name: "タスク2", hours: 12 },
        { name: "タスク3", hours: 8 },
      ],
      index: 1,
    },
    {
      name: "カテゴリ2",
      value: 300,
      task: [
        { name: "タスク4", hours: 20 },
        { name: "タスク5", hours: 10 },
      ],
      index: 1,
    },
    {
      name: "カテゴリ3",
      value: 200,
      task: [{ name: "タスク6", hours: 20 }],
      index: 1,
    },
  ];

  return {
    /** 表示するデータ */
    data,
  };
}
