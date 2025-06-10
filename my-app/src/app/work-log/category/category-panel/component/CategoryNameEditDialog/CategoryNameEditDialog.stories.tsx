import type { Meta, StoryObj } from "@storybook/react";

import CategoryNameEditDialog from "./CategoryNameEditDialog";

const meta = {
  component: CategoryNameEditDialog,
  args: {
    open: true,
    onClose: () => {},
    category: { id: 1, name: "test" },
  },
} satisfies Meta<typeof CategoryNameEditDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
