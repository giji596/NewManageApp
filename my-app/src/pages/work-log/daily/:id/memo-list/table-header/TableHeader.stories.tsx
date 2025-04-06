import type { Meta, StoryObj } from "@storybook/react";

import TableHeader from "./TableHeader";

const meta = {
  component: TableHeader,
  args: {
    isAsc: true,
    onClickTitle: () => {},
    onHoverTitle: () => {},
    onLeaveHoverTitle: () => {},
  },
} satisfies Meta<typeof TableHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { isSelected: () => false } };
export const Selected: Story = { args: { isSelected: () => true } };
export const Desc: Story = { args: { isSelected: () => true, isAsc: false } };
