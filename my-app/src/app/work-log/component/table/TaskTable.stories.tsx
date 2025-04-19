import type { Meta, StoryObj } from '@storybook/react';

import TaskTable from './TaskTable';

const meta = {
  component: TaskTable,
} satisfies Meta<typeof TaskTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};