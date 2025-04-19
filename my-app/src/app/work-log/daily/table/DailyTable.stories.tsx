import type { Meta, StoryObj } from "@storybook/react";

import DailyTable from "./DailyTable";
import { DUMMY_DAILY_SUMMARY_DATA } from "@/dummy/daily-page";

const meta = {
  component: DailyTable,
  args: {
    itemList: DUMMY_DAILY_SUMMARY_DATA,
    isLoading: false,
    onClickRow: () => {},
  },
} satisfies Meta<typeof DailyTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Loading: Story = { args: { isLoading: true } };
export const Empty: Story = { args: { itemList: [] } };
