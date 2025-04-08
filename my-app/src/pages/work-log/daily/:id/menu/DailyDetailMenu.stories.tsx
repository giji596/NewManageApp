import type { Meta, StoryObj } from "@storybook/react";

import DailyDetailMenu from "./DailyDetailMenu";

const meta = {
  component: DailyDetailMenu,
  args: {
    date: new Date(),
    dailyHours: 8,
  },
} satisfies Meta<typeof DailyDetailMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
