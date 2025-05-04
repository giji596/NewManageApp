import type { Meta, StoryObj } from "@storybook/react";

import CreateTagDialog from "./CreateTagDialog";

const meta = {
  component: CreateTagDialog,
  args: {
    open: true,
    onClose: () => {},
  },
} satisfies Meta<typeof CreateTagDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
