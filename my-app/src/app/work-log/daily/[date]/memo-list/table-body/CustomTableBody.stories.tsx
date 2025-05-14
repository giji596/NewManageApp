import type { Meta, StoryObj } from "@storybook/react";

import CustomTableBody from "./CustomTableBody";

const meta = {
  component: CustomTableBody,
  args: {
    memoItem: {
      id: 0,
      summary: "本文の頭の部分の一部を抜粋して表示させます",
      title: "メモ1",
      task: { id: 1, name: "タスク1" },
      tagName: "",
    },
    isActive: false,
    isHighlighted: false,
    onClickRow: () => {},
  },
} satisfies Meta<typeof CustomTableBody>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Active: Story = { args: { isActive: true } };
export const Highlighted: Story = { args: { isHighlighted: true } };
