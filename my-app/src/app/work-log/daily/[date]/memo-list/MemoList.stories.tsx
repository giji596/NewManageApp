import type { Meta, StoryObj } from "@storybook/react";

import MemoList from "./MemoList";

const meta = {
  component: MemoList,
  args: { selectedItemTaskId: 1 },
} satisfies Meta<typeof MemoList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
