import type { Meta, StoryObj } from "@storybook/react";

import DailyTable from "./DailyTable";

const meta = {
  component: DailyTable,
} satisfies Meta<typeof DailyTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
