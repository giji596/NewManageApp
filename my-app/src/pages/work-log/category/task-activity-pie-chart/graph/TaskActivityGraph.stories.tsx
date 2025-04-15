import type { Meta, StoryObj } from "@storybook/react";

import TaskActivityGraph from "./TaskActivityGraph";
import { DUMMY_TASK_ACTIVITY_DATA } from "@/dummy/category-page";

const meta = {
  component: TaskActivityGraph,
} satisfies Meta<typeof TaskActivityGraph>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: DUMMY_TASK_ACTIVITY_DATA,
  },
};
