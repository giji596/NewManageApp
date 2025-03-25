import type { Meta, StoryObj } from "@storybook/react";

import DailyTableHeader from "./DailyTableHeader";

const meta = {
  component: DailyTableHeader,
  args: {
    isAsc: true,
    OnClickTitle: () => {},
    OnHoverTitle: () => {},
    OnLeaveHoverTitle: () => {},
  },
} satisfies Meta<typeof DailyTableHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isSelected: () => false,
  },
};
export const Selected: Story = {
  args: { isSelected: () => true },
};
export const Desc: Story = {
  args: { isAsc: false, isSelected: () => true },
};
