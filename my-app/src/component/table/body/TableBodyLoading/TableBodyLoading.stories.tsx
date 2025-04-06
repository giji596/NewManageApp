import type { Meta, StoryObj } from '@storybook/react';

import TableBodyLoading from './TableBodyLoading';

const meta = {
  component: TableBodyLoading,
} satisfies Meta<typeof TableBodyLoading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    colCount: 0
  }
};