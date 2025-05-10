import type { Meta, StoryObj } from "@storybook/react";

import CategoryDisplayRangeDialog from "./CategoryDisplayRangeDialog";

const meta = {
  component: CategoryDisplayRangeDialog,
  args: {
    open: true,
    onClose: () => {},
    initDisplayRange: "last-3-months",
    initStartDate: { initYear: 2025, initMonth: 4, initDay: 4 },
    initEndDate: { initYear: 2025, initMonth: 5, initDay: 4 },
  },
} satisfies Meta<typeof CategoryDisplayRangeDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
