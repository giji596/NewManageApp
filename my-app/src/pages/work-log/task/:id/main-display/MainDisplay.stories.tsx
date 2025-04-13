import type { Meta, StoryObj } from "@storybook/react";

import MainDisplay from "./MainDisplay";

const meta = {
  component: MainDisplay,
  args: {
    taskName: "taskName",
    isFavorite: false,
    categoryName: "categoryName",
    progress: 50,
    totalHours: 30,
    onClickNavigateCategoryPage: () => {},
  },
} satisfies Meta<typeof MainDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Favorite: Story = { args: { isFavorite: true } };
