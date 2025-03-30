import type { Meta, StoryObj } from "@storybook/react";

import CustomMenuTitle from "./CustomMenuTitle";

const meta = {
  component: CustomMenuTitle,
  args: {
    titleList: ["title1", "title2", "title3"],
  },
} satisfies Meta<typeof CustomMenuTitle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
