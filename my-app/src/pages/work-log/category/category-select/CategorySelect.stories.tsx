import type { Meta, StoryObj } from "@storybook/react";

import CategorySelect from "./CategorySelect";

const meta = {
  component: CategorySelect,
  args: {
    categoryOptions: [
      { id: 1, name: "カテゴリ1" },
      { id: 2, name: "カテゴリ2" },
      { id: 3, name: "カテゴリ3" },
      { id: 4, name: "カテゴリ4" },
    ],
    selectedCategoryId: 1,
    onChangeCategoryId: () => {},
  },
} satisfies Meta<typeof CategorySelect>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
