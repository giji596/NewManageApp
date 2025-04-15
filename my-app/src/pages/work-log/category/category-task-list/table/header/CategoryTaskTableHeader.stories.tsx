import type { Meta, StoryObj } from '@storybook/react';

import CategoryTaskTableHeader from './CategoryTaskTableHeader';

const meta = {
  component: CategoryTaskTableHeader,
} satisfies Meta<typeof CategoryTaskTableHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};