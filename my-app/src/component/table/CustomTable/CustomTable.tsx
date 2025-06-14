import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Collapse,
} from "@mui/material";
import { Fragment, memo, ReactNode } from "react";
import CustomHeaderSortCheckLabel from "../header/CustomHeaderSortCheckLabel/CustomHeaderSortCheckLabel";
import { useCustomTable } from "./useCustomTable";
import CustomMenuWrapper from "@/component/menu/CustomMenuWrapper/CustomMenuWrapper";
import CustomMenuCheckBox from "@/component/menu/content/CustomMenuCheckBox/CustomMenuCheckBox";
import CustomMenuWrapperLogic from "@/component/menu/CustomMenuWrapper/CustomMenuWrapperLogic";
import CustomHeaderSortLabel from "../header/CustomHeaderSortLabel/CustomHeaderSortLabel";
import HeaderFavoriteLabel from "../header/HeaderFavoriteLabel/HeaderFavoriteLabel";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import TableBodyLoading from "../body/TableBodyLoading/TableBodyLoading";
import TableBodyNoItem from "../body/TableBodyNoItem/TableBodyNoItem";
import { getValueByNestedKey, NestedKeys } from "@/lib/table";

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
  key: NestedKeys<T>;
  /** タイトル名 */
  title: string;
  /** 固定幅 */
  width?: number | string;
  /**
   * ラベルの選択賜 設定なし: 通常ラベル
   * - sortable: ソート可能
   * - sortableAndFilterable: ソートとフィルター可能
   * - favoriteToggle: お気に入り切り替え(要key名:isFavorite)
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
  /** ヘッダーの固定の有無 */
  stickyHeader?: boolean;
  /** ロード状態 */
  loading?: boolean;
  /** デフォルトのソート対象 */
  initialTarget?: string;
  /** 選択中のid(rowのselectedでハイライト) */
  selectedId?: number | null;
  /** 行のクリック時のハンドラー */
  onClickRow?: (id: number) => void;
  /** 行の色 */
  rowColor?: string | ((row: T) => string);
};

/**
 * カスタムテーブル
 */
function InnerTable<T extends { id: number }>({
  data,
  columns,
  collapsibleItemKey,
  stickyHeader,
  loading,
  initialTarget,
  selectedId,
  onClickRow,
  rowColor,
}: CustomTableProps<T>) {
  const {
    bodyStyle,
    headerStyle,
    isAsc,
    isSelected,
    handleClickSortLabel,
    doSort,
    filterList,
    toggleFilterCheckBox,
    doFilter,
    isFavoriteChecked,
    toggleFavoriteCheck,
  } = useCustomTable({
    data,
    columns,
    initialTarget,
  });
  const { openTargetIdRef, handleMouseEnter, handleMouseLeave, ...logic } =
    CustomMenuWrapperLogic();
  return (
    <>
      <Table sx={{ tableLayout: "fixed" }} stickyHeader={stickyHeader}>
        {/** ヘッダー部分 */}
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={String(col.key)} sx={headerStyle(col)}>
                {/** ソートラベル */}
                {col.labelProp === "sortable" && (
                  <CustomHeaderSortLabel
                    title={col.title}
                    isSelected={isSelected(col.title)}
                    isAsc={isAsc}
                    onClickTitle={handleClickSortLabel}
                  />
                )}
                {/** ソートフィルターラベル */}
                {col.labelProp === "sortableAndFilterable" && (
                  <CustomHeaderSortCheckLabel
                    title={col.title}
                    isSelected={isSelected(col.title)}
                    isAsc={isAsc}
                    refId={String(col.key)}
                    onClickTitle={handleClickSortLabel}
                    onHoverTitle={handleMouseEnter}
                    onLeaveTitle={handleMouseLeave}
                  />
                )}
                {/** お気に入りラベル */}
                {col.labelProp === "favoriteToggle" && (
                  <HeaderFavoriteLabel
                    isChecked={isFavoriteChecked}
                    onClick={toggleFavoriteCheck}
                  />
                )}
                {col.labelProp === undefined && col.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        {/** ボディ部分 */}
        <TableBody>
          {loading && <TableBodyLoading colCount={columns.length} />}
          {!loading && data.length === 0 && (
            <TableBodyNoItem colCount={columns.length} />
          )}
          {!loading &&
            data.length > 0 &&
            data
              .filter(doFilter)
              .sort(doSort)
              .map((row) => (
                <Fragment key={row.id}>
                  {/** データの分の行を展開 */}
                  <TableRow
                    hover={selectedId !== undefined || onClickRow !== undefined} // 選択設定がある場合のみhover有効
                    onClick={onClickRow ? () => onClickRow(row.id) : undefined}
                    selected={selectedId === row.id}
                    sx={{
                      bgcolor:
                        typeof rowColor === "string"
                          ? rowColor
                          : rowColor?.(row),
                      "& *": {
                        borderBottom: collapsibleItemKey ? "none" : undefined,
                      },
                      cursor: onClickRow ? "pointer" : undefined,
                    }}
                  >
                    {columns.map((col) => {
                      let children: ReactNode;
                      // お気に入りラベルの場合は星を表示
                      if (col.labelProp === "favoriteToggle") {
                        const isFavorite = Boolean(
                          getValueByNestedKey(row, col.key)
                        );
                        if (isFavorite) {
                          // お気に入りなら塗りつぶし
                          children = <StarIcon color="primary" />;
                        } else {
                          // そうでないならボーダーだけ
                          children = <StarBorderIcon />;
                        }
                      }
                      // お気に入りじゃない場合
                      if (col.labelProp !== "favoriteToggle") {
                        if (col.renderCell) {
                          // レンダーセルに指定があれば設定された任意のコンポーネント
                          children = col.renderCell(row);
                        } else {
                          // それ以外はその内容そのまま表示
                          children = <>{getValueByNestedKey(row, col.key)}</>;
                        }
                      }
                      return (
                        /** データ内のprop数分のセルを展開 */
                        <TableCell key={String(col.key)} sx={bodyStyle}>
                          {children}
                        </TableCell>
                      );
                    })}
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
                </Fragment>
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
}
const CustomTable = memo(InnerTable) as typeof InnerTable;
export default CustomTable;
