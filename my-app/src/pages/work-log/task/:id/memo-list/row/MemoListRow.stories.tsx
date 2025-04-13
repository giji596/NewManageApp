import type { Meta, StoryObj } from "@storybook/react";

import MemoListRow from "./MemoListRow";

const meta = {
  component: MemoListRow,
  args: {
    memoItem: {
      id: 1,
      date: new Date(),
      title: "メモのタイトル",
      tag: "何かしらのタグ",
      summary: "ほんぶんの一部分、頭の部分を抜粋して表示している",
    },
    isActive: false,
    onClickRow: () => {},
  },
} satisfies Meta<typeof MemoListRow>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Active: Story = { args: { isActive: true } };
