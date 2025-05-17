import type { Meta, StoryObj } from "@storybook/react";

import EditTagItem from "./EditTagItem";

const meta = {
  component: EditTagItem,
  args: { defaultTagName: "タグ1", onFinishEdit: () => {} },
} satisfies Meta<typeof EditTagItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
