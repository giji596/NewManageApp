import type { Meta, StoryObj } from "@storybook/react";

import CategoryLineGraph from "./CategoryLineGraph";

const meta = {
  component: CategoryLineGraph,
  args: {
    data: [
      {
        date: "2022-01-01",
        1: 50,
      },
      {
        date: "2022-01-05",
        1: 40,
      },
      {
        date: "2022-01-10",
        1: 30,
      },
      {
        date: "2022-01-15",
        1: 20,
      },
      {
        date: "2022-01-20",
        1: 10,
      },
    ],
    dataInfo: [
      {
        key: "1",
        name: "カテゴリ1",
        color: "red",
      },
    ],
    range: "day",
    displayData: "totalHours",
  },
} satisfies Meta<typeof CategoryLineGraph>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
