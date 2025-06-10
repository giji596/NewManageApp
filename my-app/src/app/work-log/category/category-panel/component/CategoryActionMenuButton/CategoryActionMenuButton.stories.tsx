import type { Meta, StoryObj } from "@storybook/react";

import CategoryActionMenuButton from "./CategoryActionMenuButton";

const meta = {
  component: CategoryActionMenuButton,
  args: {
    isCompleted: false,
    isNoCategory: false,
    onClickDisplayRange: () => {},
    onClickComplete: () => {},
    onClickAddTask: () => {},
    onClickDelete: () => {},
    onClickEditName: () => {},
  },
} satisfies Meta<typeof CategoryActionMenuButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Completed: Story = { args: { isCompleted: true } };
