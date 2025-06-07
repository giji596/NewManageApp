import { useTheme } from "@mui/material";
import { useCallback } from "react";

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

  return {
    /**
     *  recharts 線グラフのカラーを取得する
     * @param color: string 色番号(0~20)
     */
    getLineGraphThemeColor,
  };
};
