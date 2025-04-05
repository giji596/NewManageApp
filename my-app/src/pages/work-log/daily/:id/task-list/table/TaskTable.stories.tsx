import type { Meta, StoryObj } from "@storybook/react";

import TaskTable from "./TaskTable";
import { DUMMY_TASK_TABLE_LIST } from "@/dummy/daily-page";

const meta = {
  component: TaskTable,
  args: {
    taskList: DUMMY_TASK_TABLE_LIST,
    isLoading: false,
    onClickRow: () => {},
  },
} satisfies Meta<typeof TaskTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Loading: Story = { args: { isLoading: true } };
export const NoItem: Story = { args: { taskList: [] } };
