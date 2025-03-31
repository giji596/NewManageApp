import type { Meta, StoryObj } from "@storybook/react";

import DailyHeader from "./DailyHeader";

const meta = {
  component: DailyHeader,
  args: {
    displayYear: "2025",
    displayMonth: "4",
    isLoading: false,
    handlePrev: () => {},
    handleNext: () => {},
    handleYearChange: () => {},
    handleMonthChange: () => {},
    onClickEditToday: () => {},
    onClickEditSelectDate: () => {},
  },
} satisfies Meta<typeof DailyHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
