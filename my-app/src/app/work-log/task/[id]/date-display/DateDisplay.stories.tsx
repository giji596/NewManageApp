import type { Meta, StoryObj } from "@storybook/react";

import DateDisplay from "./DateDisplay";

const meta = {
  component: DateDisplay,
  args: {
    firstActivityDate: "2025/03/24",
    lastActivityDate: "2025/04/12",
  },
} satisfies Meta<typeof DateDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
