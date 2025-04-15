import type { Meta, StoryObj } from "@storybook/react";

import TaskActivityGraph from "./TaskActivityGraph";

const meta = {
  component: TaskActivityGraph,
} satisfies Meta<typeof TaskActivityGraph>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: [
      { taskName: "タスク1", totalHours: 80 },
      { taskName: "タスク2", totalHours: 20 },
      { taskName: "タスク3", totalHours: 5 },
      { taskName: "タスク4", totalHours: 2.5 },
    ],
  },
};
