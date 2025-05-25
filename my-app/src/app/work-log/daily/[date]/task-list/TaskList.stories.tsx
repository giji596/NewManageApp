import type { Meta, StoryObj } from "@storybook/react";

import TaskList from "./TaskList";

const meta = {
  component: TaskList,
  args: {
    selectedItemId: 1,
    handleClickRow: () => {},
  },
} satisfies Meta<typeof TaskList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
