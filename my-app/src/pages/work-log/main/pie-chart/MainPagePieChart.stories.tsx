import type { Meta, StoryObj } from '@storybook/react';

import MainPagePieChart from './MainPagePieChart';

const meta = {
  component: MainPagePieChart,
} satisfies Meta<typeof MainPagePieChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};