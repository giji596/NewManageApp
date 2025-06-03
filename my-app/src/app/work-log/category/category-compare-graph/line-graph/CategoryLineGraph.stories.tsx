import type { Meta, StoryObj } from '@storybook/react';

import CategoryLineGraph from './CategoryLineGraph';

const meta = {
  component: CategoryLineGraph,
} satisfies Meta<typeof CategoryLineGraph>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};