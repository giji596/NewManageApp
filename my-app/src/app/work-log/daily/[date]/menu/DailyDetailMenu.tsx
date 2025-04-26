"use client";
import { Button, Stack, Typography } from "@mui/material";
import AddTaskIcon from "@mui/icons-material/AddTask";
import AddCommentIcon from "@mui/icons-material/AddComment";
import useDialog from "@/hook/useDialog";
import TaskAddDialog from "./dialog/TaskAddDialog/TaskAddDialog";
import MemoAddDialog from "./dialog/MemoAddDialog/MemoAddDialog";
import DailyDetailMenuLogic from "./DailyDetailMenuLogic";
import { TaskOption } from "@/type/Task";

type Props = {
  /** 対象の日付データ */
  date: Date;
  /** 稼働時間 */
  dailyHours: number;
  /** タスクの一覧(メモで使う) */
  taskList: TaskOption[];
};

/**
 * 日付詳細　ナビゲーションやらのメニューのコンポーネント
 */
export default function DailyDetailMenu({ date, dailyHours, taskList }: Props) {
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
  const { dateString, dailyHourCoverGraphLength, isNoTask } =
    DailyDetailMenuLogic({
      date,
      dailyHours,
      taskList,
    });
  return (
    <>
      <Stack spacing={2}>
        {/** 日付と時間 */}
        <Stack spacing={1}>
          <Typography>{dateString}</Typography>
          <Stack direction="row">
            <Typography>稼働時間： {dailyHours}(h)</Typography>
            <Stack
              direction="row-reverse"
              sx={{
                width: "80%",
                height: 20,
                background:
                  "linear-gradient(to right,rgb(148, 244, 236),rgb(114, 255, 173),rgb(255, 53, 53))",
                borderRadius: 1,
              }}
            >
              <Stack
                sx={{
                  height: "100%",
                  width: "0%",
                  backgroundColor: "#eee",
                  animation: "grow 1s ease-out forwards",
                  "@keyframes grow": {
                    "0%": { width: "100%" },
                    "100%": {
                      width: `${dailyHourCoverGraphLength}%`,
                    },
                  },
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
          taskList={taskList}
          open={openMemo}
          onClose={onCloseMemo}
          isTaskSelected={false}
        />
      )}
    </>
  );
}
