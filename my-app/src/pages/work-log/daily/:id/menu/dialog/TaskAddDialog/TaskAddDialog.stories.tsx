import type { Meta, StoryObj } from "@storybook/react";

import TaskAddDialog from "./TaskAddDialog";

const meta = {
  component: TaskAddDialog,
  args: {
    open: true,
    onClose: () => {},
  },
} satisfies Meta<typeof TaskAddDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
