import type { Meta, StoryObj } from "@storybook/react";

import MonthlyWorkHeatMap from "./MonthlyWorkHeatMap";

const meta = {
  component: MonthlyWorkHeatMap,
} satisfies Meta<typeof MonthlyWorkHeatMap>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
