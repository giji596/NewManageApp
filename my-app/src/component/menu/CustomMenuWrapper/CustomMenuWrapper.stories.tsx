import type { Meta, StoryObj } from "@storybook/react";
import CustomMenuWrapper from "./CustomMenuWrapper";

const meta = {
  component: CustomMenuWrapper,
  args: {
    children: <>children</>,
    logic: {
      open: true,
      anchorEl: null,
      openTargetIdRef: { current: 1 },
      handleClose: () => {},
      handleMouseEnter: () => {},
      handleMouseLeave: () => {},
    },
  },
} satisfies Meta<typeof CustomMenuWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
