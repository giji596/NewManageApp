import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { memo } from "react";

type Props = {
  /** 選択中の値 */
  selectedValue: "in-progress" | "all" | "completed";
  /** 値を変更するハンドラー */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

/**
 * カテゴリページのタスクリストのヘッダー
 */
const CategoryTaskListHeader = memo(function CategoryTaskListHeader({
  selectedValue,
  onChange,
}: Props) {
  return (
    <FormControl>
      <RadioGroup row value={selectedValue} onChange={onChange}>
        <FormControlLabel
          value="in-progress"
          control={<Radio />}
          label="進行中"
        />
        <FormControlLabel value="all" control={<Radio />} label="全て" />
        <FormControlLabel
          value="completed"
          control={<Radio />}
          label="完了済み"
        />
      </RadioGroup>
    </FormControl>
  );
});
export default CategoryTaskListHeader;
