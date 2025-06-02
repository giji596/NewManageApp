import type { Meta, StoryObj } from "@storybook/react";

import CancelButtonAndPop from "./CancelButtonAndPop";

const meta = {
  component: CancelButtonAndPop,
  args: {
    isInput: true,
    onCancel: () => {},
  },
} satisfies Meta<typeof CancelButtonAndPop>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
