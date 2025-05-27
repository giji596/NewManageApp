import { memo } from "react";
import { Box, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

type Props = {
  /** 表示文言 */
  text: string;
  /** 全体の幅 */
  width?: number;
  /** タイトル */
  title: string;
};

/**
 * MUIのセレクト(outlined)風のディスプレイコンポーネント
 */
const SelectLikeDisplay = memo(function SelectLikeDisplay({
  text,
  width,
  title,
}: Props) {
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "rgba(0, 0, 0, 0.23)", // outlinedと同じ色
        borderRadius: "4px",
        padding: "16px 8px 16px 14px",
        position: "relative",
        display: "flex",
        width,
        alignItems: "center",
        justifyContent: "space-between",
        color: "rgba(0, 0, 0, 0.38)", // disabledなTypography色
        cursor: "default",
        fontSize: "1rem",
      }}
    >
      {/** タイトル */}
      <Typography
        sx={{
          fontSize: "0.719rem",
          position: "absolute", // 絶対位置で枠に被らせる
          px: 0.5, // 左右の空白部分
          top: -8, // 位置
          left: 10, // 位置
          backgroundColor: "#ffffff", // 背景を透過させない
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: "1rem",
        }}
      >
        {text}
      </Typography>
      <ArrowDropDownIcon />
    </Box>
  );
});
export default SelectLikeDisplay;
