"use client";
import { Paper } from "@mui/material";
import { memo, ReactNode } from "react";
import { TooltipProps } from "recharts";

type Props<T> = TooltipProps<number, string> & {
  children: (dataItem: T) => ReactNode;
};
/**
 * 円グラフにホバー時に表示するツールチップのラッパー
 * @param {children} (dataItem:T)=>{dataItem.params.map((param)=>{children})}で値を渡す
 * dataItemは表示中のpayload(存在するかチェック済み)
 */
const CustomToolTipWrapper = memo(function CustomToolTipWrapper<T>({
  active, // 引数はPieからToolChipで受け取る特有のもの
  payload, // active:boolean,payload:Array([0].payloadに対象のデータがある)
  children,
}: Props<T>) {
  if (active && payload && payload.length) {
    const dataItem = payload[0].payload as T; // ← ここで Pie の 1つの data を取得！
    return <Paper sx={{ px: 5, py: 1 }}>{children(dataItem)}</Paper>;
  }
  return null;
});
export default CustomToolTipWrapper;
