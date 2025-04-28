import type { Meta, StoryObj } from "@storybook/react";

import TaskSummaryTableHeader from "./TaskSummaryTableHeader";

const meta = {
  component: TaskSummaryTableHeader,
  args: {
    isFavoriteChecked: false,
    isAsc: false,
    categoryCheckList: { カテゴリ1: false, カテゴリ2: false, カテゴリ3: false },
    onClickFavorite: () => {},
    onClickTitle: () => {},
    onClickSelectCategory: () => {},
  },
} satisfies Meta<typeof TaskSummaryTableHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { isSelected: () => false } };
export const Selected: Story = { args: { isSelected: () => true } };
export const Asc: Story = { args: { isSelected: () => true, isAsc: true } };
export const FavoriteChecked: Story = {
  args: { isSelected: () => false, isFavoriteChecked: true },
};
