import type { Meta, StoryObj } from "@storybook/react";

import CustomMenuCheckBox from "./CustomMenuCheckBox";

const meta = {
  component: CustomMenuCheckBox,
  args: {
    checkList: { item1: false, item2: false, item3: false },
    onClickSelect: () => {},
  },
} satisfies Meta<typeof CustomMenuCheckBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
