import type { Meta, StoryObj } from "@storybook/react";

import WorkCalendarNav from "./WorkCalendarNav";

const meta = {
  component: WorkCalendarNav,
  args: {
    currentYear: 2025,
    currentMonth: 4,
    onPrevMonth: () => {},
    onNextMonth: () => {},
    isMinMonth: false,
    isMaxMonth: false,
  },
} satisfies Meta<typeof WorkCalendarNav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
