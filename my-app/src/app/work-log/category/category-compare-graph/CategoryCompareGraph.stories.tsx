import type { Meta, StoryObj } from '@storybook/react';

import CategoryCompareGraph from './CategoryCompareGraph';

const meta = {
  component: CategoryCompareGraph,
} satisfies Meta<typeof CategoryCompareGraph>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};