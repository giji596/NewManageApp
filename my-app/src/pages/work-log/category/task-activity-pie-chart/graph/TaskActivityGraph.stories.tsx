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
      { name: "タスク1", value: 600 },
      { name: "タスク2", value: 200 },
      { name: "タスク3", value: 150 },
      { name: "タスク4", value: 50 },
    ],
  },
};
