import type { Meta, StoryObj } from "@storybook/react";

import CategoryDisplayRangeDialog from "./CategoryDisplayRangeDialog";

const meta = {
  component: CategoryDisplayRangeDialog,
  args: {
    open: true,
    onClose: () => {},
    startDateLogic: {
      year: 2024,
      month: 4,
      day: 22,
      onChangeYear: () => {},
      onChangeMonth: () => {},
      onChangeDay: () => {},
    },
    endDateLogic: {
      year: 2024,
      month: 4,
      day: 22,
      onChangeYear: () => {},
      onChangeMonth: () => {},
      onChangeDay: () => {},
    },
  },
} satisfies Meta<typeof CategoryDisplayRangeDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
