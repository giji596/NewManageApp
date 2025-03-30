import { Checkbox, FormControlLabel, MenuItem } from "@mui/material";

type Props = {
  /** 選択肢の配列 */
  checkList: Record<string, boolean>;
  /** 選択した際のイベントハンドラ */
  onClickSelect: (item: string) => void;
};

/**
 * チェックボックスを含むカスタムメニューコンポーネント
 */
export default function CustomMenuCheckBox({
  checkList,
  onClickSelect,
}: Props) {
  return Object.entries(checkList).map(([name, bool]) => (
    <MenuItem key={name} onClick={() => onClickSelect(name)}>
      <FormControlLabel control={<Checkbox checked={bool} />} label={name} />
    </MenuItem>
  ));
}
