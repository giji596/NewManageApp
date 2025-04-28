import type { Meta, StoryObj } from "@storybook/react";

import Page from "./page";

const meta = {
  component: Page,
} satisfies Meta<typeof Page>;

export default meta;

type Story = StoryObj<typeof Page>;

export const Default: Story = {
  render: () => <Page params={Promise.resolve({ date: "" })} />,
};
