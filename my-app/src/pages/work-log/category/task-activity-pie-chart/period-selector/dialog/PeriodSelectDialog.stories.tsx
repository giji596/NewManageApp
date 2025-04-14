import type { Meta, StoryObj } from '@storybook/react';

import PeriodSelectDialog from './PeriodSelectDialog';

const meta = {
  component: PeriodSelectDialog,
} satisfies Meta<typeof PeriodSelectDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    onClose: () => {}
  }
};