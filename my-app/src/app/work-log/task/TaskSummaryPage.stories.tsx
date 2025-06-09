import type { Meta, StoryObj } from "@storybook/react";

import TaskSummaryPage from "./TaskSummaryPage";

const meta = {
  component: TaskSummaryPage,
} satisfies Meta<typeof TaskSummaryPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
