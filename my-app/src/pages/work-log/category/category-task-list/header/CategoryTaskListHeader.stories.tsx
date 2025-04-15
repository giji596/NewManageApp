import type { Meta, StoryObj } from '@storybook/react';

import CategoryTaskListHeader from './CategoryTaskListHeader';

const meta = {
  component: CategoryTaskListHeader,
} satisfies Meta<typeof CategoryTaskListHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};