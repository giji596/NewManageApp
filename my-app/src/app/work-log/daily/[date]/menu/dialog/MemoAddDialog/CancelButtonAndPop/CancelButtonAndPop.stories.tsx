import type { Meta, StoryObj } from "@storybook/react";

import CancelButtonAndPop from "./CancelButtonAndPop";
import { Stack } from "@mui/material";

const meta = {
  component: CancelButtonAndPop,
  args: {
    isInput: true,
    onCancel: () => {},
  },
  decorators: [
    (Story) => (
      // アンカーの位置わかりやすいように　デコレーター付与
      <Stack
        width={500}
        height={300}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Story />
      </Stack>
    ),
  ],
} satisfies Meta<typeof CancelButtonAndPop>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
