import type { Meta, StoryObj } from '@storybook/react';

import CategoryDisplayRangeDialog from './CategoryDisplayRangeDialog';

const meta = {
  component: CategoryDisplayRangeDialog,
} satisfies Meta<typeof CategoryDisplayRangeDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};