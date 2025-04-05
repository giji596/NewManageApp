import type { Meta, StoryObj } from "@storybook/react";

import TaskTable from "./TaskTable";

const meta = {
  component: TaskTable,
  args: {
    taskList: [
      { id: 0, name: "タスク1", categoryName: "カテゴリー1", dailyHours: 8 },
      { id: 1, name: "タスク2", categoryName: "カテゴリー1", dailyHours: 6 },
      { id: 2, name: "タスク3", categoryName: "カテゴリー2", dailyHours: 8 },
      { id: 3, name: "タスク4", categoryName: "カテゴリー2", dailyHours: 5 },
      { id: 4, name: "タスク5", categoryName: "カテゴリー3", dailyHours: 3 },
      { id: 5, name: "タスク6", categoryName: "カテゴリー3", dailyHours: 4 },
      {
        id: 6,
        name: "タスク19qwdqwfqfqfqqwdqwdwqwqsqwqdqdsadadadadasdasdadasdasdadasdassad04",
        categoryName: "カテゴリー11sdwqqwdwdwqdwqdqwdqwdqdqwqddqwqddaw21",
        dailyHours: 8,
      },
    ],
    isLoading: false,
    onClickRow: () => {},
  },
} satisfies Meta<typeof TaskTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Loading: Story = { args: { isLoading: true } };
export const NoItem: Story = { args: { taskList: [] } };
