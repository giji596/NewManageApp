"use client";
import { IconButton, Stack, Typography } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import MainDisplayLogic from "./MainDisplayLogic";

type Props = {
  /** タスク名 */
  taskName: string;
  /** お気に入りかどうか */
  isFavorite: boolean;
  /** カテゴリ名 */
  categoryName: string;
  /** 進捗 */
  progress: number;
  /** 稼働合計時間 */
  totalHours: number;
  /** カテゴリページに飛ぶボタンを押した際のハンドラー */
  onClickNavigateCategoryPage: () => void;
};

/**
 * タスク詳細ページのメイン部分の表示
 */
export default function MainDisplay({
  taskName,
  isFavorite,
  categoryName,
  progress,
  totalHours,
  onClickNavigateCategoryPage,
}: Props) {
  const { growAnimation } = MainDisplayLogic({ progress });
  return (
    <Stack spacing={0.5}>
      {/** タスク/ おきにいり */}
      <Stack direction="row" justifyContent={"space-between"}>
        <Stack direction="row" spacing={1.5}>
          <Typography color="text.primary" width={125} textAlign={"right"}>
            タスク名:
          </Typography>
          <Typography color="text.primary">{taskName}</Typography>
        </Stack>
        {isFavorite && <StarIcon color="primary" />}
        {!isFavorite && <StarBorderIcon />}
      </Stack>
      {/** カテゴリ */}
      <Stack direction="row" alignItems={"center"} spacing={1.5}>
        <Typography color="text.primary" width={125} textAlign={"right"}>
          カテゴリ名:
        </Typography>
        <Typography color="text.primary">{categoryName}</Typography>
        <IconButton size="small" onClick={onClickNavigateCategoryPage}>
          <ArrowCircleRightIcon />
        </IconButton>
      </Stack>
      {/** 進捗 */}
      <Stack direction="row" spacing={1.5}>
        <Typography color="text.primary" width={125} textAlign={"right"}>
          進捗:
        </Typography>
        <Stack
          direction="row-reverse"
          sx={(theme) => ({
            width: "70%",
            height: 20,
            background: theme.palette.gradient.achievement,
            borderRadius: 1,
          })}
        >
          <Stack
            sx={{
              height: "100%",
              width: "0%",
              backgroundColor: "gray.normal",
              animation: `${growAnimation} 1s ease-out forwards`,
            }}
          />
        </Stack>
        <Typography color="text.primary">{progress}%</Typography>
      </Stack>
      {/** 稼働合計 */}
      <Stack direction="row" spacing={1.5}>
        <Typography color="text.primary" width={125} textAlign={"right"}>
          稼働合計時間:
        </Typography>
        <Typography color="text.primary">{totalHours}(h)</Typography>
      </Stack>
    </Stack>
  );
}
