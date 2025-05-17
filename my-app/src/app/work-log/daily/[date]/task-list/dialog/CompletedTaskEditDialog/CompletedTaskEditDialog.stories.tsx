import type { Meta, StoryObj } from "@storybook/react";

import CompletedTaskEditDialog from "./CompletedTaskEditDialog";

const meta = {
  component: CompletedTaskEditDialog,
  args: {
    open: true,
    onClose: () => {},
  },
} satisfies Meta<typeof CompletedTaskEditDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
