import type { Meta, StoryObj } from "@storybook/react";

import DailyHeader from "./DailyHeader";

const meta = {
  component: DailyHeader,
  args: {
    isLoading: false,
    onClickEditSelectDate: () => {},
  },
} satisfies Meta<typeof DailyHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
