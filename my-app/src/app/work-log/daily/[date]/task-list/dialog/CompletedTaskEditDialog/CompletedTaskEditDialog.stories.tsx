import type { Meta, StoryObj } from '@storybook/react';

import CompletedTaskEditDialog from './CompletedTaskEditDialog';

const meta = {
  component: CompletedTaskEditDialog,
} satisfies Meta<typeof CompletedTaskEditDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};