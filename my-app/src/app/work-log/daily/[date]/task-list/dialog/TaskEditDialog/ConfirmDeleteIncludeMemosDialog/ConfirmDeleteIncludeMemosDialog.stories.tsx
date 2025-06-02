import type { Meta, StoryObj } from '@storybook/react';

import ConfirmDeleteIncludeMemosDialog from './ConfirmDeleteIncludeMemosDialog';

const meta = {
  component: ConfirmDeleteIncludeMemosDialog,
} satisfies Meta<typeof ConfirmDeleteIncludeMemosDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};