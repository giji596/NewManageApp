import type { Meta, StoryObj } from "@storybook/react";

import DateSelectMenuButton from "./DateSelectMenuButton";

const meta = {
  component: DateSelectMenuButton,
  args: {
    name: "name",
    selectValueProps: {
      year: 2024,
      month: 5,
      day: 22,
      onChangeYear: () => {},
      onChangeMonth: () => {},
      onChangeDay: () => {},
    },
    disabled: false,
  },
} satisfies Meta<typeof DateSelectMenuButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
