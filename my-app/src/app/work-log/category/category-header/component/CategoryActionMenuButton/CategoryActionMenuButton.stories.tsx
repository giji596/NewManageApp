import type { Meta, StoryObj } from '@storybook/react';

import CategoryActionMenuButton from './CategoryActionMenuButton';

const meta = {
  component: CategoryActionMenuButton,
} satisfies Meta<typeof CategoryActionMenuButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};