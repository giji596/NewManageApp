import type { Meta, StoryObj } from '@storybook/react';

import CategoryTaskList from './CategoryTaskList';

const meta = {
  component: CategoryTaskList,
} satisfies Meta<typeof CategoryTaskList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};