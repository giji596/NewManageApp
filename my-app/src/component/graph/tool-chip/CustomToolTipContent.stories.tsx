import type { Meta, StoryObj } from '@storybook/react';

import CustomToolTipContent from './CustomToolTipContent';

const meta = {
  component: CustomToolTipContent,
} satisfies Meta<typeof CustomToolTipContent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "name",
    value: "value"
  }
};