import type { Meta, StoryObj } from "@storybook/react";

import TaskAddDialog from "./TaskAddDialog";

const meta = {
  component: TaskAddDialog,
  args: {
    categoryList: [
      { id: 1, name: "カテゴリ1" },
      { id: 2, name: "カテゴリ2" },
      { id: 3, name: "カテゴリ3" },
      { id: 4, name: "カテゴリ4" },
    ],
    taskList: [
      { id: 1, name: "タスク1" },
      { id: 2, name: "タスク2" },
      { id: 3, name: "タスク3" },
      { id: 4, name: "タスク4" },
    ],
    open: true,
    onClose: () => {},
    isLoading: false,
  },
} satisfies Meta<typeof TaskAddDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const NoTask: Story = { args: { taskList: [] } };
export const Loading: Story = { args: { isLoading: true } };
