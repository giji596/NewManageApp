import type { Meta, StoryObj } from "@storybook/react";

import CategoryActionMenuButton from "./CategoryActionMenuButton";

const meta = {
  component: CategoryActionMenuButton,
  args: {
    onClickDisplayRange: () => {},
    onClickComplete: () => {},
    onClickAddTask: () => {},
    onClickDelete: () => {},
  },
} satisfies Meta<typeof CategoryActionMenuButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
