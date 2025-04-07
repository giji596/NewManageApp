import type { Meta, StoryObj } from "@storybook/react";

import CircleGraph from "./CircleGraph";

const meta = {
  component: CircleGraph,
  args: {
    data: [
      {
        name: "Group A",
        value: 400,
        task: [
          { id: 1, name: "A1", percent: "60%" },
          { id: 2, name: "A2", percent: "40%" },
        ],
      },
      {
        name: "Group B",
        value: 300,
        task: [
          { id: 3, name: "B1", percent: "25%" },
          { id: 4, name: "B2", percent: "20%" },
          { id: 5, name: "B3", percent: "20%" },
          { id: 6, name: "B4", percent: "20%" },
          { id: 7, name: "B5", percent: "15%" },
        ],
      },
      {
        name: "Group C",
        value: 300,
        task: [
          { id: 8, name: "C1", percent: "67%" },
          { id: 9, name: "C2", percent: "33%" },
        ],
      },
      {
        name: "Group D",
        value: 200,
        task: [
          { id: 10, name: "D1", percent: "75%" },
          { id: 11, name: "D2", percent: "25%" },
        ],
      },
    ],
  },
} satisfies Meta<typeof CircleGraph>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
