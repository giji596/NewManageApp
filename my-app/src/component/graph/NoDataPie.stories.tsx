import type { Meta, StoryObj } from "@storybook/react";

import NoDataPie from "./NoDataPie";

const meta = {
  component: NoDataPie,
  args: {
    height: 300,
    width: 450,
    radius: 90,
  },
} satisfies Meta<typeof NoDataPie>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
