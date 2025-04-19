import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import CategorySelectLogic from "./CategorySelectLogic";

type Props = {
  /** 選択中のカテゴリid */
  selectedCategoryId: number;
  /** 選択中のカテゴリを変更する関数 */
  onChangeCategoryId: (e: SelectChangeEvent) => void;
};

/**
 * カテゴリページのカテゴリ選択部分
 */
export default function CategorySelect({
  selectedCategoryId,
  onChangeCategoryId,
}: Props) {
  const { categoryOptions } = CategorySelectLogic();
  return (
    <Stack direction={"row"} alignItems={"center"}>
      <Typography>表示中のカテゴリ：</Typography>
      <FormControl>
        <Select
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
