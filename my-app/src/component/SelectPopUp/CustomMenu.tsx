import { Menu, MenuItem } from "@mui/material";
import CustomMenuLogic from "./CustomMenuLogic";

type Props = {
  /** 選択肢の配列 */
  selector: string[];
  /** メニューアイテムをクリックした際のイベントハンドラ */
  onClick: (select: string) => void;
  /** 基本ロジック部分 */
  logic: ReturnType<typeof CustomMenuLogic>;
};

/**
 * ホバー時/クリック時などで表示する選択のポップアップコンポーネント
 */
export default function CustomMenu({ selector, onClick, logic }: Props) {
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
      {selector.map((select) => (
        // TODO:クリックした際の動作を考えてなんとかする！
        <MenuItem key={select} onClick={() => onClick(select)}>
          {select}
        </MenuItem>
      ))}
    </Menu>
  );
}
