import type { Meta, StoryObj } from "@storybook/react";

import CustomTableHeader from "./CustomTableHeader";

const meta = {
  component: CustomTableHeader,
  args: {
    isAsc: true,
    onClickTitle: () => {},
    onHoverTitle: () => {},
    onLeaveHoverTitle: () => {},
  },
} satisfies Meta<typeof CustomTableHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { isSelected: () => false } };
export const Selected: Story = { args: { isSelected: () => true } };
export const Desc: Story = { args: { isSelected: () => true, isAsc: false } };
