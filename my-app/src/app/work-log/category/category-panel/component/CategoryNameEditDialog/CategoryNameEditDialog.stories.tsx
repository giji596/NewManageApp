import type { Meta, StoryObj } from '@storybook/react';

import CategoryNameEditDialog from './CategoryNameEditDialog';

const meta = {
  component: CategoryNameEditDialog,
} satisfies Meta<typeof CategoryNameEditDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};