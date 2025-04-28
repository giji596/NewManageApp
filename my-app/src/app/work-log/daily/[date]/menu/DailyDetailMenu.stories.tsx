import type { Meta, StoryObj } from "@storybook/react";

import DailyDetailMenu from "./DailyDetailMenu";

const meta = {
  component: DailyDetailMenu,
  args: {
    date: new Date(),
    dailyHours: 8,
    taskList: [
      { id: 1, taskName: "タスク1" },
      { id: 2, taskName: "タスク2" },
      { id: 3, taskName: "タスク3" },
      { id: 4, taskName: "タスク4" },
      { id: 5, taskName: "タスク5" },
    ],
  },
} satisfies Meta<typeof DailyDetailMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
