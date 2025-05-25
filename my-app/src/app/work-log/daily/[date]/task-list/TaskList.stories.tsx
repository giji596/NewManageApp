import type { Meta, StoryObj } from "@storybook/react";

import TaskList from "./TaskList";
import { DUMMY_TASK_TABLE_LIST } from "@/dummy/daily-page";

const meta = {
  component: TaskList,
  args: {
    taskList: DUMMY_TASK_TABLE_LIST,
    isLoading: false,
    selectedItemId: 1,
    handleClickRow: () => {},
  },
} satisfies Meta<typeof TaskList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Loading: Story = { args: { isLoading: true } };
