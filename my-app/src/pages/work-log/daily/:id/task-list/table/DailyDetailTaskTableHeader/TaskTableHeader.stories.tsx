import type { Meta, StoryObj } from '@storybook/react';

import TaskTableHeader from './TaskTableHeader';

const meta = {
  component: TaskTableHeader,
} satisfies Meta<typeof TaskTableHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isAsc: true,
    isSelected: () => {},
    OnClickTitle: () => {},
    onHoverTitle: () => {},
    onLeaveHoverTitle: () => {}
  }
};