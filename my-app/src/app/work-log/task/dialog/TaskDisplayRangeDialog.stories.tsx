import type { Meta, StoryObj } from "@storybook/react";

import TaskDisplayRangeDialog from "./TaskDisplayRangeDialog";

const meta = {
  component: TaskDisplayRangeDialog,
  args: {
    open: true,
    onClose: () => {},
  },
} satisfies Meta<typeof TaskDisplayRangeDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
