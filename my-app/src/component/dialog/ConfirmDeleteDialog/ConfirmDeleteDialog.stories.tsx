import type { Meta, StoryObj } from "@storybook/react";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

const meta = {
  component: ConfirmDeleteDialog,
} satisfies Meta<typeof ConfirmDeleteDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    onClose: () => {},
    onAccept: () => {},
  },
};
