import type { Meta, StoryObj } from "@storybook/react";

import TaskMenu from "./TaskMenu";

const meta = {
  component: TaskMenu,
  args: {
    onClickEdit: () => {},
    onClickNavigateCategory: () => {},
    onClickNavigateTask: () => {},
    isActive: true,
  },
} satisfies Meta<typeof TaskMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Disabled: Story = { args: { isActive: false } };
