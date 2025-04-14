import type { Meta, StoryObj } from '@storybook/react';

import PeriodSelectMenuButton from './PeriodSelectMenuButton';

const meta = {
  component: PeriodSelectMenuButton,
} satisfies Meta<typeof PeriodSelectMenuButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};