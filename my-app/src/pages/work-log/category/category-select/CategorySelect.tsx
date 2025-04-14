import { CategoryOption } from "@/type/Category";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";

type Props = {
  /** カテゴリの選択賜一覧 */
  categoryOptions: CategoryOption[];
  /** 選択中のカテゴリid */
  selectedCategoryId: number;
  /** 選択中のカテゴリを変更する関数 */
  onChangeCategoryId: (e: SelectChangeEvent) => void;
};

/**
 * カテゴリページのカテゴリ選択部分
 */
export default function CategorySelect({
  categoryOptions,
  selectedCategoryId,
  onChangeCategoryId,
}: Props) {
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
