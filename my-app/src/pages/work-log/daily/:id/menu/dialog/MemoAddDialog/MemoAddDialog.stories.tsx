import type { Meta, StoryObj } from "@storybook/react";

import MemoAddDialog from "./MemoAddDialog";

const meta = {
  component: MemoAddDialog,
  args: {
    open: true,
    onClose: () => {},
    isTaskSelected: false,
  },
} satisfies Meta<typeof MemoAddDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const TaskFixed: Story = { args: { isTaskSelected: true } };
