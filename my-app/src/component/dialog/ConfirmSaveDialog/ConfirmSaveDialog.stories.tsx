import type { Meta, StoryObj } from '@storybook/react';

import ConfirmSaveDialog from './ConfirmSaveDialog';

const meta = {
  component: ConfirmSaveDialog,
} satisfies Meta<typeof ConfirmSaveDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    onClose: () => {},
    onAccept: () => {}
  }
};