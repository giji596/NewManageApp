import { Stack } from "@mui/material";
/**
 * 日付詳細ページ
 */
export default function DailyDetailPage() {
  return (
    <Stack direction="row" spacing={1}>
      {/**　左半分(メニュー/タスク) */}
      <Stack width="50%" spacing={1}>
        {/** メニュー */}
        <Stack height="40%">めにゅー</Stack>
        {/** タスク */}
        <Stack height="60%">たすく</Stack>
      </Stack>
      {/** 右半分(グラフ/メモ) */}
      <Stack width="50%" spacing={1}>
        {/** グラフ */}
        <Stack height="60%">ぐらふ</Stack>
        {/** メモ */}
        <Stack height="40%">めも</Stack>
      </Stack>
    </Stack>
  );
}
