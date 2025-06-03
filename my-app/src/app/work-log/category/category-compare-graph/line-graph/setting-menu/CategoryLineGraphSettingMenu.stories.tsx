import type { Meta, StoryObj } from "@storybook/react";

import CategoryLineGraphSettingMenu from "./CategoryLineGraphSettingMenu";

const meta = {
  component: CategoryLineGraphSettingMenu,
  args: {
    displayTarget: "totalHours",
    onChangeDisplayTarget: () => {},
    startDate: new Date("2022-01-01"),
    endDate: new Date("2022-01-31"),
    getDataSelectRange: () => {},
  },
} satisfies Meta<typeof CategoryLineGraphSettingMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
