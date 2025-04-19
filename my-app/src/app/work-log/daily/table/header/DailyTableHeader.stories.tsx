import type { Meta, StoryObj } from "@storybook/react";

import DailyTableHeader from "./DailyTableHeader";
import { Table } from "@mui/material";

const meta = {
  component: DailyTableHeader,
  args: {
    isAsc: true,
    OnClickTitle: () => {},
    onHoverTitle: () => {},
    onLeaveHoverTitle: () => {},
  },
  decorators: [
    (StoryComponent) => (
      <Table>
        <StoryComponent />
      </Table>
    ),
  ],
} satisfies Meta<typeof DailyTableHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isSelected: () => false,
  },
};
export const Selected: Story = {
  args: { isSelected: () => true },
};
export const Desc: Story = {
  args: { isAsc: false, isSelected: () => true },
};
