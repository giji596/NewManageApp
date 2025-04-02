import {
  Button,
  CircularProgress,
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
import { DateDetail } from "@/type/Date";

type Props = {
  /** 特定の日付詳細データのダイアログ用データ */
  dateDetails: DateDetail;
  /** このダイアログの固有ロジック群 */
  logic: ReturnType<typeof DataDialogLogic>;
  /** ロード状態か */
  isLoading: boolean;
  /** ページを移動する関数 */
  navigatePage: (id: number) => void;
};
/**
 * 日付ページの日付を指定して移動するダイアログのコンポーネント
 */
export default function DateDialog({
  dateDetails,
  logic,
  isLoading,
  navigatePage,
}: Props) {
  const {
    open,
    radioSelect,
    selectYear,
    selectMonth,
    selectDay,
    selectableYearArray,
    selectableMonthArray,
    selectableDayArray,
    onClose,
    onChangeRadioSelect,
    onSelectYear,
    onSelectMonth,
    onSelectDay,
  } = logic;
  return (
    <Dialog open={open} onClose={onClose}>
      <Stack width="500px" height="300px" p={3} spacing={7}>
        {/** 上半分 */}
        <Stack height="25%">
          <FormControl>
            {/** ラジオボタン */}
            <RadioGroup
              value={radioSelect}
              onChange={onChangeRadioSelect}
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
            <FormControl
              disabled={!(radioSelect == "指定する")}
              variant="standard"
              sx={{ minWidth: 90 }}
            >
              <InputLabel>年</InputLabel>
              <Select
                onChange={onSelectYear}
                value={String(selectYear)}
                label="年"
              >
                {selectableYearArray.map((v) => (
                  <MenuItem key={v} value={v}>
                    {v}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              disabled={!(radioSelect == "指定する")}
              variant="standard"
              sx={{ minWidth: 90 }}
            >
              <InputLabel>月</InputLabel>
              <Select
                onChange={onSelectMonth}
                value={String(selectMonth)}
                label="年"
              >
                {selectableMonthArray.map((v) => (
                  <MenuItem key={v} value={v}>
                    {v}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              disabled={!(radioSelect == "指定する")}
              variant="standard"
              sx={{ minWidth: 90 }}
            >
              <InputLabel>日</InputLabel>
              <Select
                onChange={onSelectDay}
                value={String(selectDay)}
                label="年"
              >
                {selectableDayArray.map((v) => (
                  <MenuItem key={v} value={v}>
                    {v}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Stack>
        {/** 下半分 */}
        <Stack height="55%" direction="row">
          {/** 左下 */}
          <Stack width="50%" overflow={"auto"} spacing={1}>
            {isLoading && (
              <Stack alignItems={"center"} pt={5}>
                <CircularProgress />
              </Stack>
            )}
            {/** カテゴリ+タスクごとの塊 */}
            {!isLoading &&
              dateDetails.categoryList.map((item) => (
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
              {isLoading && (
                <Stack alignItems={"center"} pt={2}>
                  <CircularProgress />
                </Stack>
              )}
              {!isLoading && <Typography variant="subtitle1">メモ</Typography>}
              {!isLoading &&
                dateDetails.memoList.map((item) => (
                  <Typography key={item.id} pl={4} variant="caption">
                    {item.title}
                  </Typography>
                ))}
            </Stack>
            <Stack width="50%" alignSelf={"center"}>
              <Button
                onClick={() => {
                  onClose();
                  navigatePage(dateDetails.id);
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
