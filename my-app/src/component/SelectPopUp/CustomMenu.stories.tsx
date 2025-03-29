import type { Meta, StoryObj } from "@storybook/react";

import CustomMenu from "./CustomMenu";

const meta = {
  component: CustomMenu,
  args: {
    selector: ["SelectA", "SelectB", "SelectC"],
    onClick: () => {},
    logic: {
      open: true,
      anchorEl: null,
      handleClose: () => {},
      handleMouseEnter: () => {},
      handleMouseLeave: () => {},
    },
  },
} satisfies Meta<typeof CustomMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
