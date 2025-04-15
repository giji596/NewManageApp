import type { Meta, StoryObj } from "@storybook/react";

import PeriodSelector from "./PeriodSelector";

const meta = {
  component: PeriodSelector,
  args: {
    selectRange: "last-month",
    onChangeSelectRange: () => {},
    startDate: new Date("2025-03-14"),
    endDate: new Date("2025-04-14"),
    getDataSelectRange: () => {},
  },
} satisfies Meta<typeof PeriodSelector>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
