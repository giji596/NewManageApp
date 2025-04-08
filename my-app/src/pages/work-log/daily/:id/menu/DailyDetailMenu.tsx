import { Button, Stack, Typography } from "@mui/material";
import AddTaskIcon from "@mui/icons-material/AddTask";
import AddCommentIcon from "@mui/icons-material/AddComment";

/**
 * 日付詳細　ナビゲーションやらのメニューのコンポーネント
 */
export default function DailyDetailMenu() {
  return (
    <>
      <Stack spacing={2}>
        {/** 日付と時間 */}
        <Stack spacing={1}>
          {/** TODO:ひづけを受け取る */}
          <Typography>(ひづけ)</Typography>
          <Stack direction="row">
            {/** TODO:時間を受け取る */}
            <Typography>稼働時間： X(h)</Typography>
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
                      width: `${20}%`, // TODO:稼働時間から計算して渡す (10-稼働時間)/10*100
                    },
                  },
                }}
              />
            </Stack>
          </Stack>
        </Stack>
        {/** ナビゲーションボタン */}
        <Stack p={2} spacing={0.5}>
          {/** TODO:クリック時のイベントつけーる */}
          <Button
            variant="outlined"
            startIcon={<AddTaskIcon />}
            sx={{ width: "50%" }}
          >
            タスクを追加する
          </Button>
          <Button
            variant="outlined"
            startIcon={<AddCommentIcon />}
            sx={{ width: "50%" }}
          >
            メモを追加する
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
