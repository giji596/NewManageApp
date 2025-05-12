import type { Meta, StoryObj } from "@storybook/react";

import WorkCalendarBody from "./WorkCalendarBody";

const meta = {
  component: WorkCalendarBody,
  args: { year: 2025, month: 4 },
} satisfies Meta<typeof WorkCalendarBody>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
