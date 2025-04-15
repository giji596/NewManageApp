import type { Meta, StoryObj } from "@storybook/react";

import PeriodSelector from "./PeriodSelector";

const meta = {
  component: PeriodSelector,
  args: {
    selectRange: "last-month",
    onChangeSelectRange: () => {},
  },
} satisfies Meta<typeof PeriodSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
