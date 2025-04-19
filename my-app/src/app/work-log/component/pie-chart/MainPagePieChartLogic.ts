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
        { name: "タスク1", hours: "30(h)" },
        { name: "タスク2", hours: "12(h)" },
        { name: "タスク3", hours: "8(h)" },
      ],
    },
    {
      name: "カテゴリ2",
      value: 300,
      task: [
        { name: "タスク4", hours: "20(h)" },
        { name: "タスク5", hours: "10(h)" },
      ],
    },
    {
      name: "カテゴリ3",
      value: 200,
      task: [{ name: "タスク6", hours: "20(h)" }],
    },
  ];

  return {
    /** 表示するデータ */
    data,
  };
}
