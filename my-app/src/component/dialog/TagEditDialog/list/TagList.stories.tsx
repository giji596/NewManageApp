import type { Meta, StoryObj } from '@storybook/react';

import TagList from './TagList';

const meta = {
  component: TagList,
} satisfies Meta<typeof TagList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};