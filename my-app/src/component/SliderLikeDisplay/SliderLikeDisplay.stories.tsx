import type { Meta, StoryObj } from "@storybook/react";

import SliderLikeDisplay from "./SliderLikeDisplay";

const meta = {
  component: SliderLikeDisplay,
  args: {
    title: "タイトル",
    width: 300,
    value: 100,
  },
} satisfies Meta<typeof SliderLikeDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
