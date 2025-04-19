import type { Meta, StoryObj } from "@storybook/react";

import MemoList from "./MemoList";
import { DUMMY_TASK_DETAIL_MEMO } from "@/dummy/task-page";

const meta = {
  component: MemoList,
  args: {
    memoItemList: DUMMY_TASK_DETAIL_MEMO,
  },
} satisfies Meta<typeof MemoList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
