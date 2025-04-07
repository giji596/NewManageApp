import type { Meta, StoryObj } from "@storybook/react";

import CreateTaskDialog from "./CreateTaskDialog";

const meta = {
  component: CreateTaskDialog,
  args: {
    initialCategoryId: 1,
    open: true,
    onClose: () => {},
  },
} satisfies Meta<typeof CreateTaskDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
