import type { Meta, StoryObj } from "@storybook/react";

import SettingsDrawer from "./SettingsDrawer";

const meta = {
  component: SettingsDrawer,
  args: { onChangeTheme: () => {} },
} satisfies Meta<typeof SettingsDrawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
