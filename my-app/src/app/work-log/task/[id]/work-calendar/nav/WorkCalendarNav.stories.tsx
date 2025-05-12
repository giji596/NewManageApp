import type { Meta, StoryObj } from '@storybook/react';

import WorkCalendarNav from './WorkCalendarNav';

const meta = {
  component: WorkCalendarNav,
} satisfies Meta<typeof WorkCalendarNav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};