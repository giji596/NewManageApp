import type { Meta, StoryObj } from "@storybook/react";

import MemoAddDialog from "./MemoAddDialog";

const meta = {
  component: MemoAddDialog,
  args: {
    taskList: [
      { id: 1, name: "タスク1" },
      { id: 2, name: "タスク2" },
      { id: 3, name: "タスク3" },
      { id: 4, name: "タスク4" },
      { id: 5, name: "タスク5" },
    ],

    tagList: [
      { id: 0, name: "なし" },
      { id: 1, name: "タグ1" },
      { id: 2, name: "タグ2" },
      { id: 3, name: "タグ3" },
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
