import type { Meta, StoryObj } from "@storybook/react";

import CategoryTaskTableBody from "./CategoryTaskTableBody";

const meta = {
  component: CategoryTaskTableBody,
  args: {
    item: {
      id: 1,
      name: "タスク1",
      progress: 80,
      isFavorite: false,
    },
    onClickNavigate: () => {},
  },
} satisfies Meta<typeof CategoryTaskTableBody>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Favorite: Story = {
  args: { item: { id: 1, name: "タスク1", progress: 80, isFavorite: true } },
};
