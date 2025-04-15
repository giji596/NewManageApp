import type { Meta, StoryObj } from "@storybook/react";

import CategoryTaskTableBody from "./CategoryTaskTableBody";

const meta = {
  component: CategoryTaskTableBody,
  args: {
    isFavorite: false,
    taskName: "タスク1",
    progress: 80,
    taskId: 1,
    onClickNavigate: () => {},
  },
} satisfies Meta<typeof CategoryTaskTableBody>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Favorite: Story = { args: { isFavorite: true } };
