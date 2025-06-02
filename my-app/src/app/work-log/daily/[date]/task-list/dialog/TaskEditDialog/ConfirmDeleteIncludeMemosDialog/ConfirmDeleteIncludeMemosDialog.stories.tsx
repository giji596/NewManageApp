import type { Meta, StoryObj } from "@storybook/react";

import ConfirmDeleteIncludeMemosDialog from "./ConfirmDeleteIncludeMemosDialog";

const meta = {
  component: ConfirmDeleteIncludeMemosDialog,
  args: {
    open: true,
    onClose: () => {},
    onDelete: async () => {},
    memoTitles: ["メモ1", "メモ2", "メモ3"],
  },
} satisfies Meta<typeof ConfirmDeleteIncludeMemosDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
