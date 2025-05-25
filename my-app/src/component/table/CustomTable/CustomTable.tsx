import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Collapse,
} from "@mui/material";
import { memo } from "react";

/**
 * ラベルの選択賜
 * - sortable: ソート可能
 * - sortableAndFilterable: ソートとフィルター可能
 * - favoriteToggle: お気に入り切り替え
 */
type LabelProp = "sortable" | "sortableAndFilterable" | "favoriteToggle";

/** 行の構成 */
type ColumnConfig<T> = {
  /** valueのキー(data.nameを表示したい場合 -> "name") */
  key: keyof T;
  /** タイトル名 */
  title: string;
  /** 固定幅 */
  width?: number;
  /**
   * ラベルの選択賜 設定なし: 通常ラベル
   * - sortable: ソート可能
   * - sortableAndFilterable: ソートとフィルター可能
   * - favoriteToggle: お気に入り切り替え
   */
  labelProp?: LabelProp;
  /** 任意のコンポーネントをレンダーしたい場合 */
  renderCell?: (row: T) => React.ReactNode;
};
/** カスタムテーブルのprops */
type CustomTableProps<T> = {
  /** 任意のデータ */
  data: T[];
  /** 各行の構成 */
  columns: ColumnConfig<T>[];
  /** 展開する際のデータのキー(設定した場合、子要素を展開する)
   * - onClickイベントと同時にて併用すると機能しないため注意
   */
  collapsibleItemKey?: keyof T;
  /** 選択中のid(rowのselectedでハイライト) */
  selectedId?: number;
  /** 行のクリック時のハンドラー */
  onClickRow?: (id: number) => void;
};

/**
 * カスタムテーブル
 */
const CustomTable = memo(function CustomTable<T extends { id: number }>({
  data,
  columns,
  collapsibleItemKey,
  selectedId,
  onClickRow,
}: CustomTableProps<T>) {
  return (
    <Table>
      {/** ヘッダー部分 */}
      <TableHead>
        <TableRow>
          {columns.map((col) => (
            <TableCell key={String(col.key)} sx={{ width: col.width }}>
              {col.title}
              {/* TODO:ソートやフィルターUIは必要に応じてここに追加 */}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      {/** ボディ部分 */}
      <TableBody>
        {data.map((row) => (
          <>
            {/** データの分の行を展開 */}
            <TableRow
              key={row.id}
              onClick={onClickRow ? () => onClickRow(row.id) : undefined}
              selected={selectedId === row.id}
            >
              {columns.map((col) => (
                /** データ内のprop数分のセルを展開 */
                <TableCell key={String(col.key)}>
                  {/** レンダーセルであれば任意のコンポーネントを、そうでなければそのまま値を表示 */}
                  {col.renderCell
                    ? col.renderCell(row)
                    : String(row[col.key] ?? "")}
                </TableCell>
              ))}
            </TableRow>
            {/** 展開行(設定している場合) */}
            {collapsibleItemKey && (
              <TableRow>
                <TableCell
                  style={{ paddingBottom: 0, paddingTop: 0 }}
                  colSpan={columns.length}
                >
                  <Collapse
                    in={selectedId === row.id}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Box margin={1}>
                      {String(row[collapsibleItemKey] ?? "")}
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            )}
          </>
        ))}
      </TableBody>
    </Table>
  );
});
export default CustomTable;
