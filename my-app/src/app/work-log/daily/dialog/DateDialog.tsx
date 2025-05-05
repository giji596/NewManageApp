"use client";
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

type Props = {
  /** ダイアログの開閉状態 */
  open: boolean;
  /** ダイアログ閉じる関数 */
  onClose: () => void;
  /** ページを移動する関数 */
  navigatePage: (dateParam: string) => void;
};
/**
 * 日付ページの日付を指定して移動するダイアログのコンポーネント
 */
export default function DateDialog({
  open,
  onClose,

  navigatePage,
}: Props) {
  const {
    dateDetails,
    isLoading,
    dateParam,
    radioSelect,
    selectYear,
    selectMonth,
    selectDay,
    selectableYearArray,
    selectableMonthArray,
    selectableDayArray,
    onChangeRadioSelect,
    onSelectYear,
    onSelectMonth,
    onSelectDay,
  } = DataDialogLogic();
  return (
    <Dialog open={open} onClose={onClose}>
      <Stack width="500px" height="300px" p={3}>
        {/** 上半分 */}
        <Stack height="35%" mb={2}>
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
              <InputLabel id="year-select-label">年</InputLabel>
              <Select
                id="year-select"
                labelId="year-select-label"
                name="year-select"
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
              <InputLabel id="month-select-label">月</InputLabel>
              <Select
                id="month-select"
                labelId="month-select-label"
                name="month-select"
                onChange={onSelectMonth}
                value={String(selectMonth)}
                label="月"
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
              <InputLabel id="day-select-label">日</InputLabel>
              <Select
                id="day-select"
                labelId="day-select-label"
                name="day-select"
                onChange={onSelectDay}
                value={String(selectDay)}
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
        {/** データ表示部分 */}
        {!isLoading && dateDetails && (
          <Stack height="45%" direction="row">
            {/** 左下 */}
            <Stack width="50%" overflow={"auto"} spacing={1}>
              {/** カテゴリ+タスクごとの塊 */}
              {dateDetails.categoryList.map((item) => (
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
                {dateDetails.memoList.map((item) => (
                  <Typography key={item.id} pl={4} variant="caption">
                    {item.title}
                  </Typography>
                ))}
              </Stack>
            </Stack>
          </Stack>
        )}
        {/** ボタン部分 */}
        <Stack width="100%" height="15%" alignItems="flex-end">
          <Button
            onClick={() => {
              onClose();
              navigatePage(dateParam);
            }}
            startIcon={<ArrowCircleRightIcon />}
            disabled={isLoading}
            sx={{ width: "30%" }}
          >
            移動
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
}
