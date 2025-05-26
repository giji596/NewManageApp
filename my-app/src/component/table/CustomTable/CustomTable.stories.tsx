import type { Meta, StoryObj } from "@storybook/react";
import CustomTable, { ColumnConfig } from "./CustomTable";

type RowType = {
  id: number;
  name: string;
  age: number;
  isFavorite: boolean;
  workHours: number;
  city: string;
};
type CustomTableProps<T> = {
  /** 任意のデータ */
  data: T[];
  /** 各行の構成 */
  columns: ColumnConfig<T>[];
  /** 展開する際のデータのキー(設定した場合、子要素を展開する)
   * - onClickイベントと同時にて併用すると機能しないため注意
   */
  collapsibleItemKey?: keyof T;
  /** デフォルトのソート対象 */
  initialTarget?: string;
  /** 選択中のid(rowのselectedでハイライト) */
  selectedId?: number;
  /** 行のクリック時のハンドラー */
  onClickRow?: (id: number) => void;
};

const meta: Meta<CustomTableProps<RowType>> = {
  component: CustomTable,
  args: {
    data: [
      {
        id: 1,
        name: "John",
        age: 18,
        isFavorite: true,
        workHours: 40,
        city: "New York",
      },
      {
        id: 2,
        name: "Jane",
        age: 20,
        isFavorite: false,
        workHours: 35,
        city: "Los Angeles",
      },
      {
        id: 3,
        name: "Bob",
        age: 22,
        isFavorite: true,
        workHours: 30,
        city: "Chicago",
      },
      {
        id: 4,
        name: "Alice",
        age: 25,
        isFavorite: false,
        workHours: 45,
        city: "San Francisco",
      },
      {
        id: 5,
        name: "Mike",
        age: 28,
        isFavorite: true,
        workHours: 38,
        city: "Seattle",
      },
      {
        id: 6,
        name: "Sarah",
        age: 30,
        isFavorite: false,
        workHours: 42,
        city: "Boston",
      },
      {
        id: 7,
        name: "Emily",
        age: 32,
        isFavorite: true,
        workHours: 48,
        city: "Washington D.C.",
      },
      {
        id: 8,
        name: "David",
        age: 35,
        isFavorite: false,
        workHours: 50,
        city: "Atlanta",
      },
    ],
    columns: [
      { key: "id", title: "ID", labelProp: "sortable" },
      { key: "name", title: "Name" },
      { key: "age", title: "Age", labelProp: "sortable" },
      { key: "isFavorite", title: "Favorite", labelProp: "favoriteToggle" },
      { key: "workHours", title: "Work Hours", labelProp: "sortable" },
      { key: "city", title: "City", labelProp: "sortableAndFilterable" },
    ],
    initialTarget: "Age",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
