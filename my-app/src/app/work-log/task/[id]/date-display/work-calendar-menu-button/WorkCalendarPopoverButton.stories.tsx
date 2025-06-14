import type { Meta, StoryObj } from "@storybook/react";

import WorkCalendarPopoverButton from "./WorkCalendarPopoverButton";

const meta = {
  component: WorkCalendarPopoverButton,
  args: {
    firstActivityDate: "2025/02/22",
    lastActivityDate: "2025/05/04",
  },
} satisfies Meta<typeof WorkCalendarPopoverButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
