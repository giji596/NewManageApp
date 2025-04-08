import type { Meta, StoryObj } from "@storybook/react";

import CreateCategoryDialog from "./CreateCategoryDialog";

const meta = {
  component: CreateCategoryDialog,
  args: {
    open: true,
    onClose: () => {},
  },
} satisfies Meta<typeof CreateCategoryDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
