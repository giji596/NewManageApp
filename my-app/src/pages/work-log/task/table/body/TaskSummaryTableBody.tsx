import { TaskSummary } from "@/type/Task";
import {
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TableCell,
  TableRow,
} from "@mui/material";
import TaskSummaryTableBodyLogic from "./TaskSummaryTableBodyLogic";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { Controller } from "react-hook-form";

type Props = {
  /** タスクの一覧データ */
  taskItem: TaskSummary;
};

/**
 * タスク一覧ページのテーブルボディコンポーネント
 */
export default function TaskSummaryTableBody({ taskItem }: Props) {
  const {
    startDateString,
    lastDateString,
    progressSelects,
    backGroundColor,
    control,
  } = TaskSummaryTableBodyLogic({
    taskItem,
  });
  return (
    <TableRow sx={{ backgroundColor: backGroundColor }}>
      {/** おきにいり(チェックボックス) */}
      <TableCell>
        <Controller
          name="isFavorite"
          control={control}
          render={({ field }) => (
            <Checkbox
              {...field}
              checked={field.value} // 初期値のセットに明示する必要あり
              icon={<StarBorderIcon />}
              checkedIcon={<StarIcon />}
            />
          )}
        />
      </TableCell>
      {/** タスク名(固定) */}
      <TableCell>{taskItem.taskName}</TableCell>
      {/** カテゴリ名(固定) */}
      <TableCell>{taskItem.categoryName}</TableCell>
      {/** 進捗{セレクト} */}
      <TableCell>
        <FormControl fullWidth>
          <InputLabel>進捗</InputLabel>
          <Controller
            name="progress"
            control={control}
            render={({ field }) => (
              <Select {...field} label={"進捗"}>
                {progressSelects.map((v) => (
                  <MenuItem key={v} value={v}>
                    {v}%
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
      </TableCell>
      {/** 稼働合計(固定) */}
      <TableCell>{taskItem.totalHours}</TableCell>
      {/** 開始日(固定) */}
      <TableCell>{startDateString}</TableCell>
      {/** 最終稼働日(固定) */}
      <TableCell>{lastDateString}</TableCell>
    </TableRow>
  );
}
