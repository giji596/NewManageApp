import { Box, Typography } from "@mui/material";
import { memo } from "react";

type Props = {
  /** タイトル */
  title: string;
  /** 幅 */
  width: number;
  /** 固定の値(0(左端),100(右端)) */
  value: number;
};

/**
 * スライダーふうのdisplay
 */
const SliderLikeDisplay = memo(function SliderLikeDisplay({
  title,
  width,
  value,
}: Props) {
  return (
    <>
      <Typography
        fontSize="0.875rem"
        color="text.secondary"
        sx={{
          pointerEvents: "none", // ← これでカーソル無効化
        }}
      >
        {title}
      </Typography>
      {/** 棒の部分 */}
      <Box
        mb={"13px"}
        mt={0.75}
        sx={{
          position: "relative",
          height: 4,
          borderRadius: 2,
          width,
          backgroundColor: "grey.400", // track色
        }}
      >
        {/* たま */}
        <Box
          sx={{
            position: "absolute",
            right: width * (1 - value / 100),
            top: "50%",
            transform: `translate(50%, -50%)`,
            width: 20,
            height: 20,
            borderRadius: "50%",
            backgroundColor: "grey.500", // thumb色
          }}
        />
      </Box>
    </>
  );
});
export default SliderLikeDisplay;
