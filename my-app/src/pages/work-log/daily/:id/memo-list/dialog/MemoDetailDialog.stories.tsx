import type { Meta, StoryObj } from "@storybook/react";

import MemoDetailDialog from "./MemoDetailDialog";

const meta = {
  component: MemoDetailDialog,
  args: { open: true, onClose: () => {} },
} satisfies Meta<typeof MemoDetailDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
