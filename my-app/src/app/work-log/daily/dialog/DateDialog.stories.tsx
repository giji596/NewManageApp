import type { Meta, StoryObj } from "@storybook/react";

import DateDialog from "./DateDialog";

const meta = {
  component: DateDialog,
  args: {
    open: true,
    onClose: () => {},
  },
} satisfies Meta<typeof DateDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
