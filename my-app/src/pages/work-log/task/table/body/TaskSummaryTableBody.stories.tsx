import type { Meta, StoryObj } from "@storybook/react";

import TaskSummaryTableBody from "./TaskSummaryTableBody";

const meta = {
  component: TaskSummaryTableBody,
  args: {
    taskItem: {
      id: 1,
      isFavorite: false,
      taskName: "タスク1",
      categoryName: "カテゴリ1",
      progress: 50,
      totalHours: 20,
      startDate: new Date("2025-03-24"),
      lastDate: new Date("2025-04-10"),
    },
  },
} satisfies Meta<typeof TaskSummaryTableBody>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
