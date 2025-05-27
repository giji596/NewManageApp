"use client";
import { Fade, Paper, Popper } from "@mui/material";
import CustomMenuWrapperLogic from "./CustomMenuWrapperLogic";
import { memo, ReactNode } from "react";

type Props = {
  /** 選択肢の配列 */
  children: ReactNode;
  /** 基本ロジック部分 */
  logic: ReturnType<typeof CustomMenuWrapperLogic>;
};

/**
 * ホバー時/クリック時などで表示する選択のポップアップコンポーネント
 */
const CustomMenuWrapper = memo(function CustomMenuWrapper({
  children,
  logic,
}: Props) {
  const {
    open,
    anchorEl,
    openTargetIdRef,
    handleMouseEnter,
    handleMouseLeave,
  } = logic;
  return (
    <Popper
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onMouseEnter={(e) => handleMouseEnter(openTargetIdRef.current, e)}
      onMouseLeave={() => handleMouseLeave(openTargetIdRef.current)}
      sx={{ zIndex: 20 }}
    >
      <Fade in={open} timeout={500}>
        <Paper>{children}</Paper>
      </Fade>
    </Popper>
  );
});
export default CustomMenuWrapper;
