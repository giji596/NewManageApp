import type { Meta, StoryObj } from "@storybook/react";

import TaskEditDialog from "./TaskEditDialog";

const meta = {
  component: TaskEditDialog,
  args: {
    open: true,
    onClose: () => {},
    initialTaskName: "タスク名",
    initialCategoryId: 1,
    initialIsFavorite: false,
  },
} satisfies Meta<typeof TaskEditDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
