import type { Meta, StoryObj } from "@storybook/react";

import MemoList from "./MemoList";
import { DUMMY_MEMO_LIST_ITEM } from "@/dummy/daily-page";

const meta = {
  component: MemoList,
  args: { memoItemList: DUMMY_MEMO_LIST_ITEM, isLoading: false },
} satisfies Meta<typeof MemoList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Loading: Story = { args: { isLoading: true } };
export const NoItem: Story = { args: { memoItemList: [] } };
