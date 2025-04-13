import type { Meta, StoryObj } from "@storybook/react";

import TaskSummaryTable from "./TaskSummaryTable";
import { DUMMY_TASK_SUMMARY_DATA } from "@/dummy/task-page";

const meta = {
  component: TaskSummaryTable,
  args: {
    taskList: DUMMY_TASK_SUMMARY_DATA,
    ref: {},
    selectedItemId: 2,
    onClickItemRow: () => {},
    onDirtyChange: () => {},
  },
} satisfies Meta<typeof TaskSummaryTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
