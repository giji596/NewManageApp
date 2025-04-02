import type { Meta, StoryObj } from "@storybook/react";

import DateDialog from "./DateDialog";

const meta = {
  component: DateDialog,
  args: {
    categoryList: [
      {
        id: 0,
        name: "カテゴリ1",
        taskList: [
          { id: 0, name: "タスク1", percent: "80%" },
          { id: 1, name: "タスク2", percent: "20%" },
        ],
        percent: "60%",
      },
      {
        id: 1,
        name: "カテゴリ2",
        taskList: [
          { id: 0, name: "タスク3", percent: "80%" },
          { id: 1, name: "タスク4", percent: "20%" },
        ],
        percent: "30%",
      },
      {
        id: 2,
        name: "カテゴリ3",
        taskList: [
          { id: 0, name: "タスク5", percent: "80%" },
          { id: 1, name: "タスク6", percent: "20%" },
        ],
        percent: "10%",
      },
    ],
    memoList: [
      { id: 0, title: "メモ1" },
      { id: 1, title: "メモ2" },
      { id: 2, title: "メモ3" },
      { id: 3, title: "メモ4" },
      { id: 4, title: "メモ5" },
      { id: 5, title: "メモ6" },
      { id: 6, title: "メモ7" },
      { id: 7, title: "メモ8" },
      { id: 8, title: "メモ9" },
    ],
    logic: {
      open: true,
      onClose: () => {},
      onOpen: () => {},
      radioSelect: "昨日",
      onChangeRadioSelect: () => {},
      selectYear: 2025,
      selectMonth: 4,
      selectDay: 1,
      selectableYearArray: [
        2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015,
      ],
      selectableMonthArray: [1, 2, 3, 4],
      selectableDayArray: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      ],
      onSelectYear: () => {},
      onSelectMonth: () => {},
      onSelectDay: () => {},
    },
  },
} satisfies Meta<typeof DateDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
