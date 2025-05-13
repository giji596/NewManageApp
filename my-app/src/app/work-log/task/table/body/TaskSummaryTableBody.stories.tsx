import type { Meta, StoryObj } from "@storybook/react";

import TaskSummaryTableBody from "./TaskSummaryTableBody";
import { TaskSummaryTableBodyHandle } from "./TaskSummaryTableBodyLogic";
import { useRef } from "react";

const meta = {
  component: TaskSummaryTableBody,
  args: {
    taskItem: {
      id: 1,
      isFavorite: false,
      taskName: "タスク1",
      categoryName: "カテゴリ1",
      progress: 50,
      totalHours: 20,
      createdAt: new Date("2025-03-24"),
      lastActivityDate: new Date("2025-04-10"),
    },
    onDirtyChange: () => {},
    isSelected: false,
    onClickRow: () => {},
  },
} satisfies Meta<typeof TaskSummaryTableBody>;

export default meta;

type Story = StoryObj<typeof TaskSummaryTableBody>;

export const Default: Story = {
  render: function Render(args) {
    const rowRef = useRef<TaskSummaryTableBodyHandle>(null);

    return <TaskSummaryTableBody {...args} ref={rowRef} />;
  },
};
export const Favorite: Story = {
  args: {
    taskItem: {
      id: 1,
      isFavorite: true,
      taskName: "タスク1",
      categoryName: "カテゴリ1",
      progress: 50,
      totalHours: 20,
      createdAt: new Date("2025-03-24"),
      lastActivityDate: new Date("2025-04-10"),
    },
  },
  render: function Render(args) {
    const rowRef = useRef<TaskSummaryTableBodyHandle>(null);

    return <TaskSummaryTableBody {...args} ref={rowRef} />;
  },
};
export const Selected: Story = {
  args: { isSelected: true },
  render: function Render(args) {
    const rowRef = useRef<TaskSummaryTableBodyHandle>(null);

    return <TaskSummaryTableBody {...args} ref={rowRef} />;
  },
};
