import type { Meta, StoryObj } from "@storybook/react";

import PeriodSelectDialog from "./PeriodSelectDialog";

const meta = {
  component: PeriodSelectDialog,
  args: {
    open: true,
    onClose: () => {},
    /** 初期値(開始) */
    initialStartDate: new Date("2025-03-14"),
    /** 初期値(終了) */
    initialEndDate: new Date(),
  },
} satisfies Meta<typeof PeriodSelectDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
