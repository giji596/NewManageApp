import type { Meta, StoryObj } from "@storybook/react";

import TaskEditDialog from "./TaskEditDialog";

const meta = {
  component: TaskEditDialog,
  args: {
    itemId: 0,
    initialTaskId: 1,
    initialCategoryId: 1,
    initialHours: 8,
    initProgressRange: 50,
    open: true,
    onClose: () => {},
  },
} satisfies Meta<typeof TaskEditDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
