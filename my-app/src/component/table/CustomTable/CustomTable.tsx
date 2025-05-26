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
import CustomHeaderSortCheckLabel from "../header/CustomHeaderSortCheckLabel/CustomHeaderSortCheckLabel";
import { useCustomTable } from "./useCustomTable";
import CustomMenuWrapper from "@/component/menu/CustomMenuWrapper/CustomMenuWrapper";
import CustomMenuCheckBox from "@/component/menu/content/CustomMenuCheckBox/CustomMenuCheckBox";
import CustomMenuWrapperLogic from "@/component/menu/CustomMenuWrapper/CustomMenuWrapperLogic";

/**
 * ラベルの選択賜
 * - sortable: ソート可能
 * - sortableAndFilterable: ソートとフィルター可能
 * - favoriteToggle: お気に入り切り替え
 */
export type LabelProp = "sortable" | "sortableAndFilterable" | "favoriteToggle";

/** 行の構成 */
export type ColumnConfig<T> = {
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
  /** デフォルトのソート対象 */
  initialTarget?: string;
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
  initialTarget,
  selectedId,
  onClickRow,
}: CustomTableProps<T>) {
  const {
    isAsc,
    isSelected,
    handleClickSortLabel,
    doSort,
    filterList,
    toggleFilterCheckBox,
    doFilter,
  } = useCustomTable({
    data,
    columns,
    initialTarget,
  });
  const { openTargetIdRef, handleMouseEnter, handleMouseLeave, ...logic } =
    CustomMenuWrapperLogic();
  return (
    <>
      <Table>
        {/** ヘッダー部分 */}
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={String(col.key)} sx={{ width: col.width }}>
                {col.labelProp === "sortableAndFilterable" && (
                  <CustomHeaderSortCheckLabel
                    title={col.title}
                    isSelected={isSelected(col.title)}
                    isAsc={isAsc}
                    refId={String(col.key)}
                    onClickTitle={handleClickSortLabel} //TODO
                    onHoverTitle={handleMouseEnter}
                    onLeaveTitle={handleMouseLeave}
                  />
                )}
                {col.labelProp === undefined && col.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {/** ボディ部分 */}
        <TableBody>
          {data
            .filter(doFilter)
            .sort(doSort)
            .map((row) => (
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
      {Object.keys(filterList).map(
        (key) =>
          openTargetIdRef.current === key && (
            <CustomMenuWrapper
              key={key}
              logic={{
                openTargetIdRef,
                handleMouseEnter,
                handleMouseLeave,
                ...logic,
              }}
            >
              <CustomMenuCheckBox
                checkList={filterList[key]}
                onClickSelect={(item) => toggleFilterCheckBox(key, item)}
              />
            </CustomMenuWrapper>
          )
      )}
    </>
  );
});
export default CustomTable;
