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
    categoryFilterList: {
      カテゴリ1: { checked: true, color: "red" },
      カテゴリ2: { checked: true, color: "green" },
      カテゴリ3: { checked: true, color: "blue" },
      カテゴリ4: { checked: false, color: "yellow" },
      カテゴリ5: { checked: true, color: "orange" },
      カテゴリ6: { checked: true, color: "purple" },
      カテゴリ7: { checked: false, color: "pink" },
      カテゴリ8: { checked: true, color: "brown" },
      カテゴリ9: { checked: false, color: "grey" },
      カテゴリ10: { checked: true, color: "black" },
      カテゴリ11: { checked: false, color: "white" },
      カテゴリ12: { checked: true, color: "lightblue" },
      カテゴリ13: { checked: false, color: "lightgreen" },
      カテゴリ14: { checked: true, color: "lightyellow" },
      カテゴリ15: { checked: false, color: "lightgrey" },
    },
    toggleCategoryFilter: () => {},
  },
} satisfies Meta<typeof CategoryLineGraphSettingMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
