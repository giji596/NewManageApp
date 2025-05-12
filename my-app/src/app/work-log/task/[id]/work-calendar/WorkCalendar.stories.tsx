import type { Meta, StoryObj } from '@storybook/react';

import WorkCalendar from './WorkCalendar';

const meta = {
  component: WorkCalendar,
} satisfies Meta<typeof WorkCalendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};