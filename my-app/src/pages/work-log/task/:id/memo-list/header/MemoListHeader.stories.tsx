import type { Meta, StoryObj } from "@storybook/react";

import MemoListHeader from "./MemoListHeader";

const meta = {
  component: MemoListHeader,
  args: {
    isAsc: false,
    tagCheckList: { タグ1: false, タグ2: false, タグ3: false },
    onClickTitle: () => {},
    onClickSelectTag: () => {},
  },
} satisfies Meta<typeof MemoListHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { isSelected: () => false } };
export const Selected: Story = { args: { isSelected: () => true } };
export const Asc: Story = { args: { isSelected: () => true, isAsc: true } };
