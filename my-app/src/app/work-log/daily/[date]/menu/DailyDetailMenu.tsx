"use client";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import AddTaskIcon from "@mui/icons-material/AddTask";
import AddCommentIcon from "@mui/icons-material/AddComment";
import useDialog from "@/hook/useDialog";
import TaskAddDialog from "./dialog/TaskAddDialog/TaskAddDialog";
import MemoAddDialog from "./dialog/MemoAddDialog/MemoAddDialog";
import DailyDetailMenuLogic from "./DailyDetailMenuLogic";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

/**
 * 日付詳細　ナビゲーションやらのメニューのコンポーネント
 */
export default function DailyDetailMenu() {
  const {
    open: openTask,
    onClose: onCloseTask,
    onOpen: onOpenTask,
  } = useDialog();
  const {
    open: openMemo,
    onClose: onCloseMemo,
    onOpen: onOpenMemo,
  } = useDialog();
  const {
    dailyHours,
    taskLogSummary,
    dateString,
    growAnimation,
    isNoTask,
    navigatePrevDay,
    navigateNextDay,
    isLastRange,
    isStartRange,
  } = DailyDetailMenuLogic();
  return (
    <>
      <Stack spacing={2}>
        {/** 日付と時間 */}
        <Stack spacing={1}>
          <Stack direction="row" alignItems={"center"}>
            <IconButton
              sx={{
                transition: "transform 0.2s ease-in-out",
                "&:hover": { transform: "scale(1.2) translateX(-5px)" },
              }}
              disabled={isStartRange}
              onClick={navigatePrevDay}
            >
              <NavigateBeforeIcon />
            </IconButton>
            <Typography color="text.primary">{dateString}</Typography>
            <IconButton
              sx={{
                transition: "transform 0.2s ease-in-out",
                "&:hover": { transform: "scale(1.2) translateX(5px)" },
              }}
              disabled={isLastRange}
              onClick={navigateNextDay}
            >
              <NavigateNextIcon />
            </IconButton>
          </Stack>
          <Stack direction="row">
            <Typography color="text.primary">
              稼働時間： {dailyHours}(h)
            </Typography>
            <Stack
              direction="row-reverse"
              sx={(theme) => ({
                width: "80%",
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
          </Stack>
        </Stack>
        {/** ナビゲーションボタン */}
        <Stack p={2} spacing={0.5}>
          <Button
            variant="outlined"
            startIcon={<AddTaskIcon />}
            sx={{ width: "50%" }}
            onClick={onOpenTask}
          >
            タスクを追加する
          </Button>
          <Button
            variant="outlined"
            startIcon={<AddCommentIcon />}
            sx={{ width: "50%" }}
            onClick={onOpenMemo}
            disabled={isNoTask}
          >
            メモを追加する
          </Button>
        </Stack>
      </Stack>
      {/** ダイアログ */}
      {openTask && <TaskAddDialog open={openTask} onClose={onCloseTask} />}
      {openMemo && (
        <MemoAddDialog
          taskList={taskLogSummary}
          open={openMemo}
          onClose={onCloseMemo}
          isTaskSelected={false}
        />
      )}
    </>
  );
}
