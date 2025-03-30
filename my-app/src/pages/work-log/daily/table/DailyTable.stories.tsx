import type { Meta, StoryObj } from "@storybook/react";

import DailyTable from "./DailyTable";
import { DUMMY_DAILY_SUMMARY_DATA } from "@/dummy/daily-page";

const meta = {
  component: DailyTable,
  args: { itemList: DUMMY_DAILY_SUMMARY_DATA },
} satisfies Meta<typeof DailyTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
