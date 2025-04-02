import type { Meta, StoryObj } from '@storybook/react';

import CustomHeaderSortLabel from './CustomHeaderSortLabel';

const meta = {
  component: CustomHeaderSortLabel,
} satisfies Meta<typeof CustomHeaderSortLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "title",
    isSelected: true,
    isAsc: true,
    onClickTitle: () => {}
  }
};