import type { Meta, StoryObj } from "@storybook/react";

import TaskActivityPieChart from "./TaskActivityPieChart";

const meta = {
  component: TaskActivityPieChart,
  args: { categoryId: 2 },
} satisfies Meta<typeof TaskActivityPieChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
