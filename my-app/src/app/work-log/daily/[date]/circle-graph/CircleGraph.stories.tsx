import type { Meta, StoryObj } from "@storybook/react";

import CircleGraph from "./CircleGraph";

const meta = {
  component: CircleGraph,
} satisfies Meta<typeof CircleGraph>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
