import type { Meta, StoryObj } from "@storybook/react";

import CategorySelect from "./CategorySelect";

const meta = {
  component: CategorySelect,
  args: {
    selectedCategoryId: 1,
    onChangeCategoryId: () => {},
  },
} satisfies Meta<typeof CategorySelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
