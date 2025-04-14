import type { Meta, StoryObj } from "@storybook/react";

import PeriodSelectMenuButton from "./PeriodSelectMenuButton";

const meta = {
  component: PeriodSelectMenuButton,
  args: {
    year: 2024,
    month: 4,
    day: 22,
    onChangeYear: () => {},
    onChangeMonth: () => {},
    onChangeDay: () => {},
  },
} satisfies Meta<typeof PeriodSelectMenuButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
