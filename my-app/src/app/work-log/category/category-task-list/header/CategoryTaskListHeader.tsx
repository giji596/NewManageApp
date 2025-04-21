"use client";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
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
    <FormControl sx={{ pl: 2 }}>
      <FormLabel id="display-task-label">表示するタスク</FormLabel>
      <RadioGroup
        aria-labelledby="display-task-label"
        name="display-task"
        row
        value={selectedValue}
        onChange={onChange}
        sx={{ gap: 3 }}
      >
        <FormControlLabel
          value="in-progress"
          control={
            <Radio
              sx={{
                transform: "scale(0.5)",
                padding: 0,
              }}
            />
          }
          label="進行中"
        />
        <FormControlLabel
          value="all"
          control={
            <Radio
              sx={{
                transform: "scale(0.5)",
                padding: 0,
              }}
            />
          }
          label="全て"
        />
        <FormControlLabel
          value="completed"
          control={
            <Radio
              sx={{
                transform: "scale(0.5)",
                padding: 0,
              }}
            />
          }
          label="完了済み"
        />
      </RadioGroup>
    </FormControl>
  );
});
export default CategoryTaskListHeader;
