import type { Meta, StoryObj } from '@storybook/react';

import CategoryLineGraphSettingMenu from './CategoryLineGraphSettingMenu';

const meta = {
  component: CategoryLineGraphSettingMenu,
} satisfies Meta<typeof CategoryLineGraphSettingMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};