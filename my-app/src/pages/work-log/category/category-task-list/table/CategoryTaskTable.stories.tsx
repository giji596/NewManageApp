import type { Meta, StoryObj } from "@storybook/react";

import CategoryTaskTable from "./CategoryTaskTable";
import { DUMMY_CATEGORY_TASK_LIST } from "@/dummy/category-page";

const meta = {
  component: CategoryTaskTable,
  args: {
    taskItemList: DUMMY_CATEGORY_TASK_LIST,
  },
} satisfies Meta<typeof CategoryTaskTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
