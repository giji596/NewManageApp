import { memo } from "react";
import { Box, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

type Props = {
  /** 表示文言 */
  text: string;
  /** 全体の幅 */
  width: number;
};

/**
 * MUIのセレクト(outlined)風のディスプレイコンポーネント
 */
const SelectLikeDisplay = memo(function SelectLikeDisplay({
  text,
  width,
}: Props) {
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "rgba(0, 0, 0, 0.23)", // outlinedと同じ色
        borderRadius: "4px",
        padding: "16px 8px 16px 14px",
        display: "flex",
        width,
        alignItems: "center",
        justifyContent: "space-between",
        color: "rgba(0, 0, 0, 0.38)", // disabledなTypography色
        cursor: "default",
        fontSize: "1rem",
      }}
    >
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
