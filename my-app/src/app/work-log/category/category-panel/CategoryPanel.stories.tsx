import type { Meta, StoryObj } from "@storybook/react";

import CategoryHeader from "./CategoryPanel";

const meta = {
  component: CategoryHeader,
  args: {
    selectedCategoryId: 1,
    onChangeCategoryId: () => {},
  },
} satisfies Meta<typeof CategoryHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
