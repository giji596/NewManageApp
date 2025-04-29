import type { Meta, StoryObj } from "@storybook/react";

import DateSelectMenuButton from "./DateSelectMenuButton";

const meta = {
  component: DateSelectMenuButton,
  args: {
    name: "name",
    selectYear: 2024,
    selectMonth: 5,
    selectDay: 22,
    onChangeSelectYear: () => {},
    onChangeSelectMonth: () => {},
    onChangeSelectDay: () => {},
  },
} satisfies Meta<typeof DateSelectMenuButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
