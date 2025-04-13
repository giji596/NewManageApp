import type { Meta, StoryObj } from '@storybook/react';

import CompleteConfirmDialog from './CompleteConfirmDialog';

const meta = {
  component: CompleteConfirmDialog,
} satisfies Meta<typeof CompleteConfirmDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    onClose: () => {},
    onAccept: () => {}
  }
};