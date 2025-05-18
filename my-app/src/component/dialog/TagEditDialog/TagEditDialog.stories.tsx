import type { Meta, StoryObj } from "@storybook/react";

import TagEditDialog from "./TagEditDialog";

const meta = {
  component: TagEditDialog,
  args: {
    open: true,
    onClose: () => {},
  },
} satisfies Meta<typeof TagEditDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
