"use client";
import {
  Button,
  FormControl,
  FormLabel,
  keyframes,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CategoryHeaderLogic from "./CategoryHeaderLogic";

/**
 * カテゴリページのヘッダー部分
 */
export default function CategoryHeader() {
  const { categoryOptions, selectedCategoryId, onChangeCategoryId } =
    CategoryHeaderLogic();
  // TODO: ロジックに移動させる
  const growAnimation = keyframes`
       0% {
         width: 100%;
       }
       100% {
         width: ${40}%;
       }
     `;
  return (
    <Stack direction="row" px={4} py={2} justifyContent={"space-between"}>
      {/** 左部分(カテゴリ情報) */}
      <Stack spacing={0.5}>
        {/** カテゴリ名 + Completed? */}
        <Stack direction="row" spacing={1}>
          <Typography width="120px" textAlign={"end"} variant="h6">
            カテゴリ名:
          </Typography>
          <Typography variant="h6">ここにカテゴリ名を入れる</Typography>
          {/** TODO:完了かどうかで分岐 完了の文章 */}
          <CheckCircleIcon color="success" />
          <Typography color="success" variant="subtitle1" fontWeight={700}>
            完了済み
          </Typography>
        </Stack>
        {/** 合計稼働時間 */}
        <Stack direction="row" spacing={1}>
          <Typography width="120px" textAlign={"end"} variant="h6">
            総稼働時間:
          </Typography>
          <Typography variant="h6">x(h)</Typography>
          <Stack
            direction="row-reverse"
            sx={{
              width: "70%",
              height: 20,
              background:
                "linear-gradient(to right,rgb(188, 255, 249),rgb(71, 255, 74))",
              borderRadius: 1,
            }}
          >
            <Stack
              sx={{
                height: "100%",
                width: "0%",
                backgroundColor: "#eee",
                animation: `${growAnimation} 1s ease-out forwards`,
              }}
            />
          </Stack>
        </Stack>
        {/**  */}
        <Stack direction="row" spacing={1}>
          <Typography width="120px" textAlign={"end"} variant="h6">
            稼働期間:
          </Typography>
          <Typography variant="h6">開始~最終更新日</Typography>
        </Stack>
      </Stack>
      {/** 右部分(カテゴリ選択/完了ボタン) */}
      <Stack spacing={1}>
        <FormControl>
          <FormLabel>カテゴリを選択</FormLabel>
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
        <Button startIcon={<DoneIcon />} variant="outlined" color="success">
          完了する
        </Button>
      </Stack>
    </Stack>
  );
}
