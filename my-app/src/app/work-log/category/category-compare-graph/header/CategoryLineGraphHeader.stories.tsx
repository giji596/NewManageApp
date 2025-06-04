import type { Meta, StoryObj } from "@storybook/react";

import CategoryLineGraphHeader from "./CategoryLineGraphHeader";

const meta = {
  component: CategoryLineGraphHeader,
  args: {
    width: 500,
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
    categoryList: [
      { id: 1, name: "カテゴリ1", color: "red", value: 100 },
      { id: 2, name: "カテゴリ2", color: "green", value: 90 },
      { id: 3, name: "カテゴリ3", color: "blue", value: 80 },
      { id: 4, name: "カテゴリ4", color: "yellow", value: 70 },
      { id: 5, name: "カテゴリ5", color: "orange", value: 60 },
      { id: 6, name: "カテゴリ6", color: "purple", value: 50 },
      { id: 7, name: "カテゴリ7", color: "pink", value: 40 },
      { id: 8, name: "カテゴリ8", color: "brown", value: 30 },
      { id: 9, name: "カテゴリ9", color: "grey", value: 20 },
      { id: 10, name: "カテゴリ10", color: "black", value: 10 },
    ],
  },
} satisfies Meta<typeof CategoryLineGraphHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
