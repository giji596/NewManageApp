import type { Meta, StoryObj } from '@storybook/react';

import DisplayTagItem from './DisplayTagItem';

const meta = {
  component: DisplayTagItem,
} satisfies Meta<typeof DisplayTagItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};