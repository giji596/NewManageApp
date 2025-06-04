import type { Meta, StoryObj } from "@storybook/react";

import CategoryLineGraphHeader from "./CategoryLineGraphHeader";

const meta = {
  component: CategoryLineGraphHeader,
  args: { width: 500 },
} satisfies Meta<typeof CategoryLineGraphHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
