import type { Meta, StoryObj } from "@storybook/react";

import TagList from "./TagList";
import { dummyTagEditListItems } from "@/dummy/memo-tag";

const meta = {
  component: TagList,
  args: { tagList: dummyTagEditListItems },
} satisfies Meta<typeof TagList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
