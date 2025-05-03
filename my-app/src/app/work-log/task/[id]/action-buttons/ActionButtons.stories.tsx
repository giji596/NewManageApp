import type { Meta, StoryObj } from "@storybook/react";

import ActionButtons from "./ActionButtons";

const meta = {
  component: ActionButtons,
  args: {
    isCompleted: false,
    onClickEdit: () => {},
    onClickComplete: () => {},
    onClickDelete: () => {},
  },
} satisfies Meta<typeof ActionButtons>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Completed: Story = { args: { isCompleted: true } };
