import type { Meta, StoryObj } from "@storybook/react";

import ActionButtons from "./ActionButtons";

const meta = {
  component: ActionButtons,
  args: {
    onClickEdit: () => {},
    onClickComplete: () => {},
    onClickDelete: () => {},
  },
} satisfies Meta<typeof ActionButtons>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
