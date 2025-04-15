import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { memo } from "react";

/**
 * カテゴリページのタスクリストのヘッダー
 */
const CategoryTaskListHeader = memo(function CategoryTaskListHeader() {
  return (
    <FormControl>
      <RadioGroup row>
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
