import type { Meta, StoryObj } from '@storybook/react';

import TaskEditDialog from './TaskEditDialog';

const meta = {
  component: TaskEditDialog,
} satisfies Meta<typeof TaskEditDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    onClose: () => {}
  }
};