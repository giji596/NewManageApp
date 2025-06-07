import type { Meta, StoryObj } from "@storybook/react";

import CategoryPanel from "./CategoryPanel";

const meta = {
  component: CategoryPanel,
  args: {
    selectedCategoryId: 1,
    onChangeCategoryId: () => {},
  },
} satisfies Meta<typeof CategoryPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
