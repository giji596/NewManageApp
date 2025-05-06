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
 * カテゴリページのヘッダー部分
 */
export default function CategoryHeader() {
  const { categoryOptions, selectedCategoryId, onChangeCategoryId } =
    CategoryHeaderLogic();
  return (
    <Stack direction="row" p={4} justifyContent={"space-between"}>
      <Stack>カテゴリ関連の情報</Stack>
      <Stack>
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
        <div>完了ボタン的な</div>
      </Stack>
    </Stack>
  );
}
