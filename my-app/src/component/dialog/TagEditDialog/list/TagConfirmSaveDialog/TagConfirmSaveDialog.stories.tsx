import type { Meta, StoryObj } from "@storybook/react";

import TagConfirmSaveDialog from "./TagConfirmSaveDialog";

const meta = {
  component: TagConfirmSaveDialog,
  args: { open: true, onClose: () => {} },
} satisfies Meta<typeof TagConfirmSaveDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
