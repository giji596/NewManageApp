import type { Meta, StoryObj } from "@storybook/react";

import ImportOverwriteDialog from "./ImportOverwriteDialog";

const meta = {
  component: ImportOverwriteDialog,
  args: {
    open: true,
    onClose: () => {},
    onImport: () => {},
  },
} satisfies Meta<typeof ImportOverwriteDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
