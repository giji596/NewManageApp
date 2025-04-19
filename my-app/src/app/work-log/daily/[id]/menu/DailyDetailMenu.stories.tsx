import type { Meta, StoryObj } from "@storybook/react";

import DailyDetailMenu from "./DailyDetailMenu";

const meta = {
  component: DailyDetailMenu,
  args: {
    date: new Date(),
    dailyHours: 8,
    taskList: [
      { id: 1, name: "タスク1" },
      { id: 2, name: "タスク2" },
      { id: 3, name: "タスク3" },
      { id: 4, name: "タスク4" },
      { id: 5, name: "タスク5" },
    ],
  },
} satisfies Meta<typeof DailyDetailMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
