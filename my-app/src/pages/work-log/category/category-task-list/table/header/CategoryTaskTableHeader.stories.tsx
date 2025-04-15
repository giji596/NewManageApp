import type { Meta, StoryObj } from "@storybook/react";

import CategoryTaskTableHeader from "./CategoryTaskTableHeader";

const meta = {
  component: CategoryTaskTableHeader,
  args: {
    isAsc: false,
    onClickSortLabel: () => {},
    isFavoriteChecked: false,
    onClickFavoriteLabel: () => {},
  },
} satisfies Meta<typeof CategoryTaskTableHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { isSortTarget: () => false },
};
export const Selected: Story = {
  args: { isSortTarget: () => true },
};
export const Asc: Story = {
  args: { isSortTarget: () => true, isAsc: true },
};
export const FavoriteChecked: Story = {
  args: { isSortTarget: () => false, isFavoriteChecked: true },
};
