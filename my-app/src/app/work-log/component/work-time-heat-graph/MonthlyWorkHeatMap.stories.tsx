import type { Meta, StoryObj } from "@storybook/react";

import RecentWorkHeatMap from "./MonthlyWorkHeatMap";

const meta = {
  component: RecentWorkHeatMap,
} satisfies Meta<typeof RecentWorkHeatMap>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
