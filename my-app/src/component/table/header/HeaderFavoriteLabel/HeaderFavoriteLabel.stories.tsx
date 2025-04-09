import type { Meta, StoryObj } from "@storybook/react";

import HeaderFavoriteLabel from "./HeaderFavoriteLabel";

const meta = {
  component: HeaderFavoriteLabel,
  args: {
    isChecked: true,
    onClick: () => {},
  },
} satisfies Meta<typeof HeaderFavoriteLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const UnChecked: Story = { args: { isChecked: false } };
