import type { Meta, StoryObj } from "@storybook/react";

import SelectLikeDisplay from "./SelectLikeDisplay";

const meta = {
  component: SelectLikeDisplay,
  args: { text: "表示文言", width: 200 },
} satisfies Meta<typeof SelectLikeDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
