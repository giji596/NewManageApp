import {
  Button,
  Dialog,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import DataDialogLogic from "./DateDialogLogic";

type Props = {
  /** タスクの概要の配列 */
  categoryList: {
    id: number;
    name: string;
    taskList: { id: number; name: string; percent: string }[];
    percent: string;
  }[];
  /** メモのタイトル一覧 */
  memoList: { id: number; title: string }[];
  /** ダイアログの固有ロジック群 */
  logic: typeof DataDialogLogic;
};
/**
 * 日付ページの日付を指定して移動するダイアログのコンポーネント
 */
export default function DateDialog({ categoryList, memoList, logic }: Props) {
  const { open, onClose } = logic();
  return (
    <Dialog open={open} onClose={onClose}>
      <Stack width="500px" height="300px" p={3} spacing={7}>
        {/** 上半分 */}
        <Stack height="25%">
          <FormControl>
            {/** ラジオボタン */}
            <RadioGroup
              sx={{ transform: "scale(0.7)", transformOrigin: "left top" }}
              row
            >
              <FormControlLabel value="昨日" control={<Radio />} label="昨日" />
              <FormControlLabel
                value="一昨日"
                control={<Radio />}
                label="一昨日"
              />
              <FormControlLabel
                value="指定する"
                control={<Radio />}
                label="指定する"
              />
            </RadioGroup>
          </FormControl>
          {/** 日付フォーム */}
          <Stack direction="row" spacing={2}>
            {["年", "月", "日"].map((v) => (
              <FormControl key={v} variant="standard" sx={{ minWidth: 90 }}>
                <InputLabel>{v}</InputLabel>
                <Select value="仮データ" label={v}>
                  {v === "年"}
                  <MenuItem value="仮データ">{v}</MenuItem>
                </Select>
              </FormControl>
            ))}
          </Stack>
        </Stack>
        {/** 下半分 */}
        <Stack height="55%" direction="row">
          {/** 左下 */}
          <Stack width="50%" overflow={"auto"} spacing={1}>
            {/** カテゴリ+タスクごとの塊 */}
            {categoryList.map((item) => (
              <Stack key={item.id} pb={0.5}>
                {/* カテゴリタイトル */}
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  pr={5}
                >
                  <Typography
                    variant="subtitle2"
                    textOverflow={"ellipsis"}
                    whiteSpace={"nowrap"}
                    maxWidth={"70%"}
                    overflow={"hidden"}
                  >
                    {item.name}
                  </Typography>
                  <Typography variant="subtitle2">{item.percent}</Typography>
                </Stack>
                {/* タスクタイトル */}
                {item.taskList.map((task) => (
                  <Stack
                    key={task.id}
                    direction={"row"}
                    justifyContent={"space-between"}
                    pr={5}
                  >
                    <Typography
                      pl={5}
                      variant="caption"
                      textOverflow={"ellipsis"}
                      whiteSpace={"nowrap"}
                      maxWidth={"70%"}
                      overflow={"hidden"}
                    >
                      {task.name}
                    </Typography>
                    <Typography variant="caption">{task.percent}</Typography>
                  </Stack>
                ))}
              </Stack>
            ))}
          </Stack>
          {/** 右下 */}
          <Stack width="50%" justifyContent={"space-between"}>
            {/** メモのところ */}
            <Stack height="70%" overflow="auto" pl={2}>
              <Typography variant="subtitle1">メモ</Typography>
              {memoList.map((item) => (
                <Typography key={item.id} pl={4} variant="caption">
                  {item.title}
                </Typography>
              ))}
            </Stack>
            <Stack width="50%" alignSelf={"center"}>
              <Button
                onClick={() => {
                  onClose();
                  // TODO:ナビゲーション関連の関数もいる！
                }}
                startIcon={<ArrowCircleRightIcon />}
              >
                移動
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Dialog>
  );
}
