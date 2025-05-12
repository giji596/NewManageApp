import type { Meta, StoryObj } from "@storybook/react";

import WorkCalendar from "./WorkCalendar";

const meta = {
  component: WorkCalendar,
  args: {
    startDate: "2025/02/23",
    lastDate: "2025/05/08",
  },
} satisfies Meta<typeof WorkCalendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
