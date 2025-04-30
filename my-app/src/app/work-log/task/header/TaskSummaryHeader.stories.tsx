import type { Meta, StoryObj } from "@storybook/react";

import TaskSummaryHeader from "./TaskSummaryHeader";

const meta = {
  component: TaskSummaryHeader,
  args: {
    isDirty: false,
    isSelected: false,
    onClickChangeDisplayRange: () => {},
    onClickSave: () => {},
    onClickReset: () => {},
    onClickNavigateDetail: () => {},
  },
} satisfies Meta<typeof TaskSummaryHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Selected: Story = { args: { isSelected: true } };
export const Dirty: Story = { args: { isDirty: true } };
