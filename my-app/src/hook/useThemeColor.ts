import { useTheme } from "@mui/material";
import { useCallback, useMemo } from "react";

/**
 * テーマ色に関するカスタムフック
 */
export const useThemeColor = () => {
  const theme = useTheme();
  const getLineGraphThemeColor = useCallback(
    (color: string) => {
      const colorNumber = Number(color);
      return theme.palette.recharts.line.default[colorNumber];
    },
    [theme.palette.recharts.line.default]
  );
  const lineGraphAxisTextColor = useMemo(
    () => theme.palette.text.secondary,
    [theme.palette.text.secondary]
  );
  const tooltipBackGroundColor = useMemo(
    () => theme.palette.background.paper,
    [theme.palette.background.paper]
  );
  const tooltipTextColor = useMemo(
    () => theme.palette.text.primary,
    [theme.palette.text.primary]
  );

  return {
    /**
     *  recharts 線グラフのカラーを取得する
     * @param color: string 色番号(0~20)
     */
    getLineGraphThemeColor,
    /**
     * recharts 線グラフの軸ラベルの色 text.secondaryに依存
     */
    lineGraphAxisTextColor,
    /**
     * recharts tooltipの背景色(MUI Paperの値に依存)
     */
    tooltipBackGroundColor,
    /**
     * recharts tooltipの文字色(MUI Text primaryに依存)
     */
    tooltipTextColor,
  };
};
