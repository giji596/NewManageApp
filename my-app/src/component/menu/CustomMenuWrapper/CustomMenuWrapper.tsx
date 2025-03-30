import { Menu } from "@mui/material";
import CustomMenuWrapperLogic from "./CustomMenuWrapperLogic";
import { ReactNode } from "react";

type Props = {
  /** 選択肢の配列 */
  children: ReactNode;
  /** 基本ロジック部分 */
  logic: ReturnType<typeof CustomMenuWrapperLogic>;
};

/**
 * ホバー時/クリック時などで表示する選択のポップアップコンポーネント
 */
export default function CustomMenuWrapper({ children, logic }: Props) {
  const { open, anchorEl, handleClose, handleMouseEnter, handleMouseLeave } =
    logic;
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Menu>
  );
}
