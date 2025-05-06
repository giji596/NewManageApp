"use client";
import {
  FormControl,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import CategorySelectLogic from "./CategorySelectLogic";

/**
 * カテゴリページのカテゴリ選択部分
 */
export default function CategorySelect() {
  const { categoryOptions, selectedCategoryId, onChangeCategoryId } =
    CategorySelectLogic();
  return (
    <Stack direction={"row"} alignItems={"center"}>
      <Typography id="category-select-label">表示中のカテゴリ：</Typography>
      <FormControl>
        <Select
          labelId="category-select-label"
          id="category-select"
          name="category-select"
          variant="standard"
          value={String(selectedCategoryId)}
          onChange={onChangeCategoryId}
        >
          {categoryOptions.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}
