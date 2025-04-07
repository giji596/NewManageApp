import type { Meta, StoryObj } from "@storybook/react";

import CircleGraphToolChip from "./CircleGraphToolChip";

const meta = {
  component: CircleGraphToolChip,
  args: {
    active: true,
    payload: [
      {
        payload: {
          name: "カテゴリ1",
          value: 400,
          task: [
            { id: 1, name: "タスク1", percent: "40%" },
            { id: 2, name: "タスク2", percent: "30%" },
            { id: 3, name: "タスク3", percent: "30%" },
          ],
        },
      },
    ],
  },
} satisfies Meta<typeof CircleGraphToolChip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
