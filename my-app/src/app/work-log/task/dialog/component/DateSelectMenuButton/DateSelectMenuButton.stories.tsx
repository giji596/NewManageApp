import type { Meta, StoryObj } from '@storybook/react';

import DateSelectMenuButton from './DateSelectMenuButton';

const meta = {
  component: DateSelectMenuButton,
} satisfies Meta<typeof DateSelectMenuButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "name",
    selectYear: 0,
    selectMonth: 0,
    selectDay: 0
  }
};