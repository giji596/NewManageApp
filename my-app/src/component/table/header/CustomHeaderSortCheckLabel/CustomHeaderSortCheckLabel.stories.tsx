import type { Meta, StoryObj } from '@storybook/react';

import CustomHeaderSortCheckLabel from './CustomHeaderSortCheckLabel';

const meta = {
  component: CustomHeaderSortCheckLabel,
} satisfies Meta<typeof CustomHeaderSortCheckLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "title",
    isSelected: true,
    isAsc: true,
    refId: 0,
    onClickTitle: () => {},
    onHoverTitle: () => {},
    onLeaveTitle: () => {}
  }
};