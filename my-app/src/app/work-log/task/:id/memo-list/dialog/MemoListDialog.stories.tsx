import type { Meta, StoryObj } from "@storybook/react";

import MemoListDialog from "./MemoListDialog";

const meta = {
  component: MemoListDialog,
  args: {
    id: 1,
    title: "タイトル名",
    tagId: 1,
    open: true,
    onClose: () => {},
  },
} satisfies Meta<typeof MemoListDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
