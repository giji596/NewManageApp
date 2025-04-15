import type { Meta, StoryObj } from '@storybook/react';

import CategoryTaskTableBody from './CategoryTaskTableBody';

const meta = {
  component: CategoryTaskTableBody,
} satisfies Meta<typeof CategoryTaskTableBody>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};