"use client";
import {
  FormControl,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import CategoryHeaderLogic from "./CategoryHeaderLogic";

/**
 * カテゴリページのカテゴリ選択部分
 */
export default function CategoryHeader() {
  const { categoryOptions, selectedCategoryId, onChangeCategoryId } =
    CategoryHeaderLogic();
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
