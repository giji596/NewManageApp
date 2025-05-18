import type { Meta, StoryObj } from '@storybook/react';

import TagConfirmDeleteDialog from './TagConfirmDeleteDialog';

const meta = {
  component: TagConfirmDeleteDialog,
} satisfies Meta<typeof TagConfirmDeleteDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};