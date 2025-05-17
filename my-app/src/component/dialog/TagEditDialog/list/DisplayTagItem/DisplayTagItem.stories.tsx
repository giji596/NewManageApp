import type { Meta, StoryObj } from "@storybook/react";

import DisplayTagItem from "./DisplayTagItem";

const meta = {
  component: DisplayTagItem,
  args: { tagName: "タグ1", onClickEdit: () => {}, onClickDelete: () => {} },
} satisfies Meta<typeof DisplayTagItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
