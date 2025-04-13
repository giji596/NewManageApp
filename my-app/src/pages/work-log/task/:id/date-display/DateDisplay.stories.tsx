import type { Meta, StoryObj } from "@storybook/react";

import DateDisplay from "./DateDisplay";

const meta = {
  component: DateDisplay,
  args: {
    startDate: "2025/03/24",
    lastDate: "2025/04/12",
  },
} satisfies Meta<typeof DateDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
