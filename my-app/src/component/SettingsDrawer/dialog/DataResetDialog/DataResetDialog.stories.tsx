import type { Meta, StoryObj } from '@storybook/react';

import DataResetDialog from './DataResetDialog';

const meta = {
  component: DataResetDialog,
} satisfies Meta<typeof DataResetDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};