import type { Meta, StoryObj } from "@storybook/react";

import MemoAddDialog from "./MemoAddDialog";

const meta = {
  component: MemoAddDialog,
  args: {
    taskList: [
      { id: 1, taskName: "タスク1" },
      { id: 2, taskName: "タスク2" },
      { id: 3, taskName: "タスク3" },
      { id: 4, taskName: "タスク4" },
      { id: 5, taskName: "タスク5" },
    ],
    open: true,
    onClose: () => {},
    isTaskSelected: false,
  },
} satisfies Meta<typeof MemoAddDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const TaskFixed: Story = { args: { isTaskSelected: true } };
