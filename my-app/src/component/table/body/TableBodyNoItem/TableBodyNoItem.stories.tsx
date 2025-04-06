import type { Meta, StoryObj } from '@storybook/react';

import TableBodyNoItem from './TableBodyNoItem';

const meta = {
  component: TableBodyNoItem,
} satisfies Meta<typeof TableBodyNoItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    colCount: 0
  }
};